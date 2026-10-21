'use server'

import { getPayloadClient } from '@/utils/getPayloadClient'
import { cacheLife, cacheTag } from 'next/cache'

export default async function getArticleDetail(id: string) {
  'use cache'
  cacheLife('default')
  cacheTag(`article-${id}`)

  const payload = await getPayloadClient()

  const article = await payload.findByID({
    collection: 'articles',
    id: id,
    depth: 1,
    select: {
      Image: true,
      createdAt: true,
      excerpt: true,
      slug: true,
      title: true,
      content: true,
      author: true,
      relatedArticles: true,
    },
  })

  return article
}

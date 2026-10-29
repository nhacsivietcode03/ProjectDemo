'use server'

import { getPayloadClient } from '@/utils/getPayloadClient'
import { cacheLife, cacheTag } from 'next/cache'

export default async function getArticlesByTag(tag: string, limit = 10) {
  'use cache'
  cacheLife('default')
  cacheTag('articles')

  const payload = await getPayloadClient()
  const articles = await payload.find({
    collection: 'articles',
    limit: limit,
    sort: '-createdAt',
    where: {
      'tags.slug': { equals: tag },
    },
    depth: 1,
    select: {
      Image: true,
      title: true,
      createdAt: true,
      slug: true,
      category: true,
      subCategory: true,
    },
  })

  return articles.docs
}

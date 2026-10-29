'use server'

import { getPayloadClient } from '@/utils/getPayloadClient'
import { cacheLife, cacheTag } from 'next/cache'

export default async function getArticlesBySubCategorySlug(
  subCategorySlug: string,
  categorySlug: string,
  limit = 6,
) {
  'use cache'
  cacheLife('default')
  cacheTag('articles')

  const payload = await getPayloadClient()
  const articles = await payload.find({
    collection: 'articles',
    limit: limit,
    sort: '-createdAt',
    where: {
      'subCategory.slug': { equals: subCategorySlug },
      'category.slug': { equals: categorySlug },
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

'use server'

import { Payload } from 'payload'
import { getPayloadClient } from '@/utils/getPayloadClient'
import { cacheLife, cacheTag } from 'next/cache'
import { ArticleItem } from './getMainHomePageData'

export interface CombinedCategoryPageData {
  UtamaCategoryData: ArticleItem[]
}

const getUtamaCategory = (payload: Payload, slug: string) => {
  return payload.find({
    collection: 'articles',
    depth: 1,
    limit: 13,
    where: {
      'category.slug': {
        equals: slug,
      },
      highlight: {
        equals: true,
      },
    },
    select: {
      Image: true,
      title: true,
      excerpt: true,
      createdAt: true,
      slug: true,
      category: true,
      subCategory: true,
    },
    sort: '-createdAt',
  })
}

export default async function getCategoryPageData(slug: string): Promise<CombinedCategoryPageData> {
  'use cache'
  cacheLife('default')
  cacheTag('articles')

  const payload = await getPayloadClient()

  const [UtamaCategoryResult] = await Promise.all([getUtamaCategory(payload, slug)])

  return {
    UtamaCategoryData: UtamaCategoryResult.docs,
  }
}

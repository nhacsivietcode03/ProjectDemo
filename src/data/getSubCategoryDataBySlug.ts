'use server'

import { getPayloadClient } from '@/utils/getPayloadClient'
import { cacheLife, cacheTag } from 'next/cache'

export default async function getSubCategoryDataBySlug(slug: string) {
  'use cache'
  cacheLife('default')
  cacheTag('category')
  const payload = await getPayloadClient()
  const subCategoryList = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 10,
    sort: 'createdAt',
    where: {
      'parent.slug': { equals: slug },
    },
    select: {
      title: true,
      slug: true,
      id: true,
    },
  })
  return subCategoryList.docs
}

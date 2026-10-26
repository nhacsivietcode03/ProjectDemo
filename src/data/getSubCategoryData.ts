'use server'

import { getPayloadClient } from '@/utils/getPayloadClient'
import { cacheLife, cacheTag } from 'next/cache'

export default async function getSubCategoryData(parentId: string, limit = 5) {
  'use cache'
  cacheLife('default')
  cacheTag('category')
  const payload = await getPayloadClient()
  const subCategoryList = await payload.find({
    collection: 'categories',
    depth: 1,
    limit,
    sort: 'createdAt',
    where: {
      parent: { equals: parentId },
    },
    select: {
      title: true,
      slug: true,
      id: true,
    },
  })
  return subCategoryList.docs
}

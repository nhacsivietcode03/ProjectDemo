'use server'

import { getPayloadClient } from '@/utils/getPayloadClient'
import { cacheLife, cacheTag } from 'next/cache'

export default async function getCategoryListData() {
  'use cache'
  cacheLife('default')
  cacheTag(`categories`)

  const payload = await getPayloadClient()
  const article = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 7,
    sort: 'createdAt',
  })

  return article.docs
}

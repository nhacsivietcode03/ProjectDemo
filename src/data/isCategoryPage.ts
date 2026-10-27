'use server'

import { getPayloadClient } from '@/utils/getPayloadClient'
import { cacheLife } from 'next/cache'

export default async function isCategoryPage(slug: string) {
  'use cache'
  cacheLife('default')

  const payload = await getPayloadClient()

  const categoryResult = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 0,
  })

  if (categoryResult.docs && categoryResult.docs.length > 0) {
    return true
  }

  return false
}

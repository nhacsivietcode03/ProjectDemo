'use server'

import { getPayloadClient } from '@/utils/getPayloadClient'
import { cacheLife } from 'next/cache'

export default async function isTagPage(slug: string) {
  'use cache'
  cacheLife('default')

  const payload = await getPayloadClient()

  const tagResult = await payload.find({
    collection: 'tags',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 0,
  })

  if (tagResult.docs && tagResult.docs.length > 0) {
    return true
  }

  return false
}

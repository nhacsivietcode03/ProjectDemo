'use server'

import { getPayloadClient } from '@/utils/getPayloadClient'
import { cacheLife, cacheTag } from 'next/cache'
import { select } from 'payload/shared'

export default async function getAuthorData(id: string) {
  'use cache'
  cacheLife('default')
  cacheTag(`user`)

  const payload = await getPayloadClient()

  const article = await payload.findByID({
    collection: 'users',
    id: id,
    depth: 1,
    select: {
      name: true,
      avatar: true,
      socialMediaLinks: true,
    },
  })

  return article
}

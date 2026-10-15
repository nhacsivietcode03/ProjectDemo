'use server'

import { cache } from 'react'
import type { Ad } from '@/payload-types'
import { getPayloadClient } from '@/utils/getPayloadClient'
import { cacheLife, cacheTag } from 'next/cache'

const getAdData = cache(async (): Promise<Ad> => {
  'use cache'
  cacheLife('default')
  cacheTag('ads')

  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'ads',
    depth: 1,
  })
})

export default getAdData

'use server'

import { cache } from 'react'
import type { Ad } from '@/payload-types'
import { getPayloadClient } from '@/utils/getPayloadClient'

const getAdData = cache(async (): Promise<Ad> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'ads',
    depth: 1,
  })
})

export default getAdData

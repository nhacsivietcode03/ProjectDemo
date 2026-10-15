'use server'

import { cache } from 'react'
import type { SiteSetting } from '@/payload-types'
import { getPayloadClient } from '@/utils/getPayloadClient'
import { cacheLife, cacheTag } from 'next/cache'

const getSiteSettingsData = cache(async (): Promise<SiteSetting> => {
  'use cache'
  cacheLife('default')
  cacheTag('site-settings')

  const payload = await getPayloadClient()

  return payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })
})

export default getSiteSettingsData

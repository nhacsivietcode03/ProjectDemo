'use server'

import { cache } from 'react'
import { getPayload } from 'payload'
import buildConfig from '@/payload.config'
import type { SiteSetting } from '@/payload-types'

const getSiteSettingsData = cache(async (): Promise<SiteSetting> => {
  const payload = await getPayload({ config: buildConfig })

  return payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })
})

export default getSiteSettingsData

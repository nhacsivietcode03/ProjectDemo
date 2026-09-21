'use server'

import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export default async function getSiteSettings() {
  const payload = await getPayload({ config: buildConfig })
  const SiteSetting = await payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })
  return SiteSetting
}

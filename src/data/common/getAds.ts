'use server'

import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export default async function getAds() {
  const payload = await getPayload({ config: buildConfig })
  const { banners } = await payload.findGlobal({
    slug: 'ads',
    depth: 1,
  })
  return banners
}

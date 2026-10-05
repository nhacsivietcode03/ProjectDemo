'use server'

import { getPayload, Payload } from 'payload'
import buildConfig from '@/payload.config'
import type { Ad, SiteSetting } from '@/payload-types'

export interface GlobalsData {
  adData: Ad
  siteSettingsData: SiteSetting
}

const getAds = (payload: Payload) => {
  return payload.findGlobal({
    slug: 'ads',
    depth: 1,
  })
}

const getSiteSettings = (payload: Payload) => {
  return payload.findGlobal({
    slug: 'site-settings',
    depth: 1,
  })
}

export default async function getGlobalsData(): Promise<GlobalsData> {
  const payload = await getPayload({ config: buildConfig })

  const [adData, siteSettingsData] = await Promise.all([getAds(payload), getSiteSettings(payload)])

  return {
    adData,
    siteSettingsData,
  }
}

'use server'

import { getPayload, Payload } from 'payload'
import buildConfig from '@/payload.config'
import type { Footer } from '@/payload-types'

export interface CombinedFooterData {
  footerData: Footer
}
const fetchFooterData = (payload: Payload) => {
  return payload.findGlobal({
    slug: 'footer',
    depth: 1,
  })
}

export default async function getFooter(): Promise<CombinedFooterData> {
  const payload = await getPayload({ config: buildConfig })
  const [footerData] = await Promise.all([fetchFooterData(payload)])
  return { footerData }
}

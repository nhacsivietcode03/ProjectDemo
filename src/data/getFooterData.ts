'use server'

import { Payload } from 'payload'
import type { Footer } from '@/payload-types'
import { getPayloadClient } from '@/utils/getPayloadClient'

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
  const payload = await getPayloadClient()
  const [footerData] = await Promise.all([fetchFooterData(payload)])
  return { footerData }
}

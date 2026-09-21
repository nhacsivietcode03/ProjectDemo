'use server'

import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export default async function getFooter() {
  const payload = await getPayload({ config: buildConfig })
  const footerData = await payload.findGlobal({
    slug: 'footer',
    depth: 1,
  })
  return footerData
}

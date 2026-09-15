'use server'
import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export default async function getHeader() {
  const payload = await getPayload({ config: buildConfig })
  const headerData = await payload.findGlobal({
    slug: 'header',
    depth: 1,
  })
  return headerData
}

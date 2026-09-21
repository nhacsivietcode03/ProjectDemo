'use server'

import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export default async function getNavbar() {
  const payload = await getPayload({ config: buildConfig })
  const navbarData = await payload.findGlobal({
    slug: 'nav',
  })

  return navbarData
}

import { cache } from 'react'
import { getPayload } from 'payload'
import buildConfig from '@/payload.config'
import type { Ad } from '@/payload-types'

const getAdData = cache(async (): Promise<Ad> => {
  const payload = await getPayload({ config: buildConfig })

  return payload.findGlobal({
    slug: 'ads',
    depth: 1,
  })
})

export default getAdData

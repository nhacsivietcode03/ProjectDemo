'use server'

import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export default async function getInfografik() {
  const payload = await getPayload({ config: buildConfig })
  const Infografik = await payload.find({
    collection: 'articles',
    depth: 1,
    limit: 1,
    where: {
      'tags.slug': {
        equals: 'infografik',
      },
    },
    sort: 'createdAt',
    select: {
      Image: true,
    },
  })
  return Infografik.docs
}

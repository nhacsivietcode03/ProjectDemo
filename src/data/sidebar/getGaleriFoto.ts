'use server'

import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export default async function getGaleriFoto() {
  const payload = await getPayload({ config: buildConfig })
  const GaleriFoto = await payload.find({
    collection: 'articles',
    depth: 1,
    limit: 4,
    where: {
      'subCategory.slug': {
        equals: 'foto',
      },
    },
    sort: 'createdAt',
    select: {
      galleryImages: true,
    },
  })
  return GaleriFoto.docs
}

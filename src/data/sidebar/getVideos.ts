'use server'

import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export default async function getPodCasts() {
  const payload = await getPayload({ config: buildConfig })
  const Videos = await payload.find({
    collection: 'video',
    depth: 1,
    limit: 3,
    sort: '-createdAt',
    where: {
      type: {
        equals: 'video',
      },
      category: {
        equals: 'podcast',
      },
    },
    select: {
      title: true,
      youtubeId: true,
    },
  })
  return Videos.docs
}

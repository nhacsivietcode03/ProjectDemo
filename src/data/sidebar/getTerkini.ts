'use server'

import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export default async function getTerkini() {
  const payload = await getPayload({ config: buildConfig })
  const TerkiniLists = await payload.find({
    collection: 'articles',
    depth: 1,
    limit: 5,
    sort: '-createdAt',
    select: {
      title: true,
      Image: true,
      createdAt: true,
      slug: true,
    },
  })
  return TerkiniLists.docs
}

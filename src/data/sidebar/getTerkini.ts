'use server'

import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export default async function getTerkini() {
  const payload = await getPayload({ config: buildConfig })
  const TerkiniLists = await payload.find({
    collection: 'articles',
    depth: 1,
    limit: 5,
    sort: '-createAt',
    select: {
      title: true,
      Image: true,
      createdAt: true,
    },
  })
  return TerkiniLists.docs
}

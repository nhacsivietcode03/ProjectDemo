'use server'

import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export default async function getTrending() {
  const payload = await getPayload({ config: buildConfig })

  const TrendingLists = await payload.find({
    collection: 'articles',
    limit: 5,
    where: {
      'tags.slug': {
        equals: 'trending',
      },
    },
    select: {
      slug: true,
      title: true,
      createdAt: true,
    },
  })

  return TrendingLists.docs
}

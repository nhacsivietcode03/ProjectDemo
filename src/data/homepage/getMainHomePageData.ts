'use server'

import { getPayload, Payload } from 'payload'
import buildConfig from '@/payload.config'
import type { Article } from '@/payload-types'

export type UtamaItem = Pick<
  Article,
  'id' | 'Image' | 'title' | 'createdAt' | 'slug' | 'excerpt' | 'category' | 'subCategory'
>

export interface CombinedMainHomePageData {
  utamaData: UtamaItem[]
}

const getUtama = (payload: Payload) => {
  return payload.find({
    collection: 'articles',
    depth: 1,
    limit: 17,
    where: {
      'category.slug': {
        equals: 'berita',
      },
      highlight: {
        equals: true,
      },
    },
    sort: '-createdAt',
    select: {
      Image: true,
      title: true,
      excerpt: true,
      createdAt: true,
      slug: true,
      category: true,
      subCategory: true,
    },
  })
}

export default async function getMainHomePageData(): Promise<CombinedMainHomePageData> {
  const payload = await getPayload({ config: buildConfig })
  const [UtamaResult] = await Promise.all([getUtama(payload)])
  return {
    utamaData: UtamaResult.docs,
  }
}

'use server'

import { getPayload, Payload } from 'payload'
import buildConfig from '@/payload.config'
import type { Article } from '@/payload-types'

export type UtamaItem = Pick<
  Article,
  'id' | 'Image' | 'title' | 'createdAt' | 'slug' | 'excerpt' | 'category' | 'subCategory'
>
export type DisyorKanItem = Pick<
  Article,
  'id' | 'Image' | 'title' | 'createdAt' | 'slug' | 'category' | 'subCategory'
>
export interface CombinedMainHomePageData {
  utamaData: UtamaItem[]
  disyorkanData: DisyorKanItem[]
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

const getDisyorkan = (payload: Payload) => {
  return payload.find({
    collection: 'articles',
    depth: 1,
    limit: 7,
    where: {
      'tags.slug': {
        equals: 'disyorkan',
      },
    },
    sort: '-createdAt',
    select: {
      Image: true,
      title: true,
      createdAt: true,
      slug: true,
      category: true,
      subCategory: true,
    },
  })
}

export default async function getMainHomePageData(): Promise<CombinedMainHomePageData> {
  const payload = await getPayload({ config: buildConfig })
  const [UtamaResult, DisyorkanResult] = await Promise.all([
    getUtama(payload),
    getDisyorkan(payload),
  ])
  return {
    utamaData: UtamaResult.docs,
    disyorkanData: DisyorkanResult.docs,
  }
}

'use server'

import { getPayload, Payload } from 'payload'
import buildConfig from '@/payload.config'
import type { Article } from '@/payload-types'

export type ArticleItem = Pick<
  Article,
  'id' | 'Image' | 'title' | 'createdAt' | 'slug' | 'excerpt' | 'category' | 'subCategory'
>

export interface CombinedMainHomePageData {
  utamaData: ArticleItem[]
  disyorkanData: ArticleItem[]
  rencanaData: ArticleItem[]
  sukanData: ArticleItem[]
  duniaData: ArticleItem[]
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

const getRencana = (payload: Payload) => {
  return payload.find({
    collection: 'articles',
    depth: 1,
    limit: 6,
    where: {
      'category.slug': {
        equals: 'rencana',
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

const getSukan = (payload: Payload) => {
  return payload.find({
    collection: 'articles',
    depth: 1,
    limit: 6,
    where: {
      'category.slug': {
        equals: 'sukan',
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

const getDunia = (payload: Payload) => {
  return payload.find({
    collection: 'articles',
    depth: 1,
    limit: 6,
    where: {
      'category.slug': {
        equals: 'dunia',
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
  const [UtamaResult, DisyorkanResult, RencanaResult, SukanResult, DuniaResult] = await Promise.all(
    [
      getUtama(payload),
      getDisyorkan(payload),
      getRencana(payload),
      getSukan(payload),
      getDunia(payload),
    ],
  )
  return {
    utamaData: UtamaResult.docs,
    disyorkanData: DisyorkanResult.docs,
    rencanaData: RencanaResult.docs,
    sukanData: SukanResult.docs,
    duniaData: DuniaResult.docs,
  }
}

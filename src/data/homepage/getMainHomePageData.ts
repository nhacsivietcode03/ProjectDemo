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
  bisnesData: ArticleItem[]
  hiburanData: ArticleItem[]
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
      'subCategory.slug': {
        equals: 'nasional',
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
      'subCategory.slug': {
        equals: 'nasional',
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
      'subCategory.slug': {
        equals: 'nasional',
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

const getBisnes = (payload: Payload) => {
  return payload.find({
    collection: 'articles',
    depth: 1,
    limit: 6,
    where: {
      'category.slug': {
        equals: 'bisnes',
      },
      'subCategory.slug': {
        equals: 'nasional',
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
const getHiburan = (payload: Payload) => {
  return payload.find({
    collection: 'articles',
    depth: 1,
    limit: 6,
    where: {
      'category.slug': {
        equals: 'hiburan',
      },
      'subCategory.slug': {
        equals: 'nasional',
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
  const [
    UtamaResult,
    DisyorkanResult,
    RencanaResult,
    SukanResult,
    DuniaResult,
    BisnesResult,
    HiburanResult,
  ] = await Promise.all([
    getUtama(payload),
    getDisyorkan(payload),
    getRencana(payload),
    getSukan(payload),
    getDunia(payload),
    getBisnes(payload),
    getHiburan(payload),
  ])
  return {
    utamaData: UtamaResult.docs,
    disyorkanData: DisyorkanResult.docs,
    rencanaData: RencanaResult.docs,
    sukanData: SukanResult.docs,
    duniaData: DuniaResult.docs,
    bisnesData: BisnesResult.docs,
    hiburanData: HiburanResult.docs,
  }
}

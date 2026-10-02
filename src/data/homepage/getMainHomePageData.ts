'use server'

import { getPayload, Payload } from 'payload'
import buildConfig from '@/payload.config'
import type { Article, Video } from '@/payload-types'

export type ArticleItem = Pick<
  Article,
  'id' | 'Image' | 'title' | 'createdAt' | 'slug' | 'excerpt' | 'category' | 'subCategory'
>
export type VideoItem = Pick<
  Video,
  'id' | 'title' | 'createdAt' | 'category' | 'youtubeId' | 'youtubeUrl'
>
export type VideoShortItem = Pick<
  Video,
  'id' | 'title' | 'createdAt' | 'youtubeId' | 'youtubeUrl' | 'duration'
>
export interface CombinedMainHomePageData {
  utamaData: ArticleItem[]
  disyorkanData: ArticleItem[]
  rencanaData: ArticleItem[]
  sukanData: ArticleItem[]
  duniaData: ArticleItem[]
  bisnesData: ArticleItem[]
  hiburanData: ArticleItem[]
  gayaHidupData: ArticleItem[]
  siHatData: ArticleItem[]
  bhplusData: ArticleItem[]
  bhtvData: VideoItem[]
  videoTerkiniData: VideoShortItem[]
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
const getGayaHidup = (payload: Payload) => {
  return payload.find({
    collection: 'articles',
    depth: 1,
    limit: 5,
    where: {
      'category.slug': {
        equals: 'gaya-hidup',
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

const getSihat = (payload: Payload) => {
  return payload.find({
    collection: 'articles',
    depth: 1,
    limit: 5,
    where: {
      'category.slug': {
        equals: 'sihat',
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

const getBHPLUS = (payload: Payload) => {
  return payload.find({
    collection: 'articles',
    depth: 1,
    limit: 6,
    where: {
      'tags.slug': {
        equals: 'bhplus',
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

const getBHTV = (payload: Payload) => {
  return payload.find({
    collection: 'video',
    depth: 1,
    limit: 7,
    where: {
      type: {
        equals: 'video',
      },
      category: {
        equals: 'bthv',
      },
    },
    sort: '-createdAt',
    select: {
      title: true,
      createdAt: true,
      category: true,
      youtubeUrl: true,
      youtubeId: true,
      id: true,
    },
  })
}

const getVideoTerkini = (payload: Payload) => {
  return payload.find({
    collection: 'video',
    depth: 1,
    limit: 10,
    where: {
      type: {
        equals: 'short',
      },
    },
    sort: '-createdAt',
    select: {
      title: true,
      createdAt: true,
      duration: true,
      youtubeUrl: true,
      youtubeId: true,
      id: true,
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
    GayaHidupResult,
    SiHatResult,
    BHPLUSResult,
    BHTVResult,
    VideoTerkiniResult,
  ] = await Promise.all([
    getUtama(payload),
    getDisyorkan(payload),
    getRencana(payload),
    getSukan(payload),
    getDunia(payload),
    getBisnes(payload),
    getHiburan(payload),
    getGayaHidup(payload),
    getSihat(payload),
    getBHPLUS(payload),
    getBHTV(payload),
    getVideoTerkini(payload),
  ])
  return {
    utamaData: UtamaResult.docs,
    disyorkanData: DisyorkanResult.docs,
    rencanaData: RencanaResult.docs,
    sukanData: SukanResult.docs,
    duniaData: DuniaResult.docs,
    bisnesData: BisnesResult.docs,
    hiburanData: HiburanResult.docs,
    gayaHidupData: GayaHidupResult.docs,
    siHatData: SiHatResult.docs,
    bhplusData: BHPLUSResult.docs,
    bhtvData: BHTVResult.docs,
    videoTerkiniData: VideoTerkiniResult.docs,
  }
}

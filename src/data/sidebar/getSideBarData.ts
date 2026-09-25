'use server'

import { getPayload, Payload } from 'payload'
import buildConfig from '@/payload.config'
import type { Article, Video } from '@/payload-types'

export type GaleriItem = Pick<Article, 'id' | 'galleryImages'>
export type InfografikItem = Pick<Article, 'id' | 'Image'>
export type TerkiniItem = Pick<Article, 'id' | 'slug' | 'title' | 'Image' | 'createdAt'>
export type TrendingItem = Pick<Article, 'id' | 'slug' | 'title' | 'createdAt'>
export type PodcastItem = Pick<Video, 'id' | 'title' | 'youtubeId'>

export interface CombinedSideBarData {
  galeriData: GaleriItem[]
  infografikData: InfografikItem[]
  terkiniData: TerkiniItem[]
  trendingData: TrendingItem[]
  videosData: PodcastItem[]
}

const getGaleriFoto = (payload: Payload) => {
  return payload.find({
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
}

const getInfografik = (payload: Payload) => {
  return payload.find({
    collection: 'articles',
    depth: 1,
    limit: 1,
    where: {
      'tags.slug': {
        equals: 'infografik',
      },
    },
    sort: 'createdAt',
    select: {
      Image: true,
    },
  })
}

const getTerkini = (payload: Payload) => {
  return payload.find({
    collection: 'articles',
    depth: 1,
    limit: 5,
    sort: '-createdAt',
    where: {
      and: [
        {
          or: [
            {
              'subCategory.slug': {
                not_equals: 'foto',
              },
            },
            {
              subCategory: {
                equals: null,
              },
            },
          ],
        },
        {
          or: [
            {
              'tags.slug': {
                not_equals: 'infografik',
              },
            },
            {
              tags: {
                equals: null,
              },
            },
          ],
        },
      ],
    },
    select: {
      title: true,
      Image: true,
      createdAt: true,
      slug: true,
    },
  })
}

const getTrending = (payload: Payload) => {
  return payload.find({
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
}

const getVideos = (payload: Payload) => {
  return payload.find({
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
}

export default async function getSideBarData(): Promise<CombinedSideBarData> {
  const payload = await getPayload({ config: buildConfig })
  const [galeriResult, infografikResult, terkiniResult, trendingResult, videosResult] =
    await Promise.all([
      getGaleriFoto(payload),
      getInfografik(payload),
      getTerkini(payload),
      getTrending(payload),
      getVideos(payload),
    ])
  return {
    galeriData: galeriResult.docs,
    infografikData: infografikResult.docs,
    terkiniData: terkiniResult.docs,
    trendingData: trendingResult.docs,
    videosData: videosResult.docs,
  }
}

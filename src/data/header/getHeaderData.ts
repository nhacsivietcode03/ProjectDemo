'use server'

import { getPayload, Payload } from 'payload'
import buildConfig from '@/payload.config'
import { Category, Header, Nav } from '@/payload-types'

export interface CombinedHeaderData {
  categoryData: Category[]
  headerGlobalData: Header
  navBarData: Nav
}

const getchCategories = (payload: Payload) => {
  return payload.find({
    collection: 'categories',
    depth: 1,
    sort: 'createdAt',
    where: {
      slug: { not_equals: 'galeri' },
    },
  })
}

const getchHeaderGlobalData = (payload: Payload) => {
  return payload.findGlobal({
    slug: 'header',
    depth: 1,
  })
}

const getchNavBar = (payload: Payload) => {
  return payload.findGlobal({
    slug: 'nav',
  })
}

export default async function getHeader(): Promise<CombinedHeaderData> {
  const payload = await getPayload({ config: buildConfig })

  const [categoryData, headerGlobalData, navBarData] = await Promise.all([
    getchCategories(payload),
    getchHeaderGlobalData(payload),
    getchNavBar(payload),
  ])

  return {
    categoryData: categoryData.docs,
    headerGlobalData,
    navBarData,
  }
}

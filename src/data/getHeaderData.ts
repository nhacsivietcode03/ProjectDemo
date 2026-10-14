'use server'

import { Payload } from 'payload'
import { Category, Header, Nav } from '@/payload-types'
import { getPayloadClient } from '@/utils/getPayloadClient'
import { cacheLife } from 'next/cache'

export interface CombinedHeaderData {
  categoryData: Category[]
  headerGlobalData: Header
  navBarData: Nav
}

const getchCategories = (payload: Payload) => {
  return payload.find({
    collection: 'categories',
    depth: 1,
    limit: 7,
    sort: 'createdAt',
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
  'use cache'
  cacheLife('default')

  const payload = await getPayloadClient()

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

'use server'

import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export default async function getCategories() {
  const payload = await getPayload({ config: buildConfig })
  const categories = await payload.find({
    collection: 'categories',
    depth: 1,
    sort: 'createdAt',
  })
  return categories.docs
}

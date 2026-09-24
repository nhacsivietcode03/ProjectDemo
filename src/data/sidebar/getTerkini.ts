'use server'

import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

export default async function getTerkini() {
  const payload = await getPayload({ config: buildConfig })
  const TerkiniLists = await payload.find({
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
  return TerkiniLists.docs
}

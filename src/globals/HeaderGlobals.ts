import { revalidateAfterChangeGlobal } from '@/hooks/revalidateAfterChange'
import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  hooks: {
    afterChange: [revalidateAfterChangeGlobal(['header'])],
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caroselItems',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'content',
          type: 'text',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

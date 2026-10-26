import { revalidateAfterChangeGlobal } from '@/hooks/revalidateAfterChange'
import { GlobalConfig } from 'payload'

export const nav: GlobalConfig = {
  slug: 'nav',
  hooks: {
    afterChange: [revalidateAfterChangeGlobal(['nav'])],
  },
  fields: [
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Các thẻ',
    },
    {
      name: 'externalLinks',
      type: 'array',
      label: 'Các liên kết ngoài',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

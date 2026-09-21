import { GlobalConfig } from 'payload'

export const Ads: GlobalConfig = {
  slug: 'ads',
  admin: {
    description: 'Quản lý toàn bộ banner quảng cáo tĩnh của site',
  },
  fields: [
    {
      name: 'banners',
      type: 'array',
      fields: [
        {
          name: 'slot',
          type: 'select',
          required: true,
          options: [
            { label: '970 x 90 (Header banner)', value: '970x90' },
            { label: '300 x 250 (sidebar)', value: '300x250' },
            { label: '300 x 600 (sidebar)', value: '300x600' },
            { label: '400 x 200', value: '400x200' },
            { label: '300 x 300 (1x1/OOP)', value: '300x300' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

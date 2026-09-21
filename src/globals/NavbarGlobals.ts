import { GlobalConfig } from 'payload'

export const nav: GlobalConfig = {
  slug: 'nav',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            { label: 'Tag', value: 'tag' },
            { label: 'External link', value: 'external' },
          ],
        },
        {
          name: 'tag',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'tag',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'external',
          },
        },
      ],
    },
  ],
}

import type { Block } from 'payload'

export const AdBlock: Block = {
  slug: 'ad_block',
  labels: {
    singular: 'Quảng Cáo (Giữa bài)',
    plural: 'Các Khối Quảng Cáo',
  },
  fields: [
    {
      name: 'adSize',
      type: 'select',
      label: 'Chọn kích thước quảng cáo',
      required: true,
      options: [
        { label: '320 x 100 ', value: '320x100' },
        { label: '300 x 250 (sidebar)', value: '300x250' },
        { label: '400 x 200', value: '400x200' },
      ],
    },
  ],
}

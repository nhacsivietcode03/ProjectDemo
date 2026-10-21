import type { Block } from 'payload'

export const Ad400x200Block: Block = {
  // SLUG NÀY PHẢI KHỚP VỚI BÊN NEXT.JS
  slug: 'ad_400x200_block',
  labels: {
    singular: 'Quảng Cáo 400x200 (Giữa bài)',
    plural: 'Các Khối Quảng Cáo',
  },
  // Vì khối quảng cáo này cố định (không cần biên tập viên nhập chữ gì thêm),
  // nên mảng fields để trống.
  fields: [],
}

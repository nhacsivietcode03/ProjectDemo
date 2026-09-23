import { autoFormatSlug } from '@/hooks/autoHook'
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [autoFormatSlug],
      },
      admin: {
        description: 'Nếu để trống thì tự động lấy title làm slug',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      label: 'Parent Category',
      admin: {
        description:
          'Blank this if this is parent Category. Select parent Category if this is sub-cateogry',
      },
    },
  ],
}

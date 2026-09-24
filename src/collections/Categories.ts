import { autoFormatSlug } from '@/hooks/autoHook'
import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      hooks: {
        beforeValidate: [autoFormatSlug],
      },
      admin: {
        description: 'Tự động lấy title làm slug',
        readOnly: true,
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Parent Category',
      admin: {
        description:
          'Blank this if this is parent Category. Select parent Category if this is sub-cateogry',
      },
      filterOptions: ({ id }) => {
        return id ? { id: { not_equals: id } } : false
      },
    },
  ],
}

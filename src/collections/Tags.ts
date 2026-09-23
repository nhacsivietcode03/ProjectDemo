import { autoFormatSlug } from '@/hooks/autoHook'
import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tag',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      hooks: {
        beforeValidate: [autoFormatSlug],
      },
      admin: {
        description: 'Nếu để trống thì tự động lấy title làm slug',
      },
    },
  ],
}

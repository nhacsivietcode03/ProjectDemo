import type { CollectionConfig, Where } from 'payload'
import { autoFormatSlug } from '@/hooks/autoHook'

const Foto_Category_ID = '6ab4c6ce3564817f88bf8a30'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      unique: true,
      hooks: { beforeValidate: [autoFormatSlug] },
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Category',
      admin: {
        position: 'sidebar',
      },
      filterOptions: (): Where => {
        return {
          and: [{ parent: { exists: false } }, { id: { not_equals: Foto_Category_ID } }],
        }
      },
    },

    {
      name: 'subCategory',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
      filterOptions: (options): Where => {
        const selectedCollections = options.data?.category

        if (!selectedCollections || selectedCollections.length === 0) {
          return { id: { equals: Foto_Category_ID } }
        }

        return { parent: { in: selectedCollections } }
      },
    },

    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        condition: (data) => data?.subCategory !== Foto_Category_ID,
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        condition: (data) => data?.subCategory !== Foto_Category_ID,
      },
    },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      admin: {
        condition: (data) => data?.subCategory !== Foto_Category_ID,
      },
    },
    {
      name: 'Image',
      type: 'upload',
      relationTo: 'media',
      admin: {},
    },

    {
      name: 'galleryImages',
      type: 'array',
      label: 'Danh sách ảnh (Gallery)',
      admin: {
        condition: (data) => data?.subCategory === Foto_Category_ID,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

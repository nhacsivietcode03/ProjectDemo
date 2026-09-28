import type { CollectionConfig, Where } from 'payload'
import { autoFormatSlug } from '@/hooks/autoHook'

const Foto_Category_ID = '6ab648a5a4758a106f362fe7'
const Infografik_Category_ID = '6ab64095783c95d72547b196'

const isFotoCategorySelected = (data: any) => {
  if (!data?.category || !Array.isArray(data.category)) return false
  return data.category.some(
    (category: any) => category === Foto_Category_ID || category.id === Foto_Category_ID,
  )
}

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
      hasMany: true, // Trả về một mảng chứa ID các categories
      label: 'Category',
      admin: {
        position: 'sidebar',
      },
      filterOptions: () => {
        return {
          parent: { exists: false },
        }
      },
    },
    {
      name: 'subCategory',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ data }): Where => {
        const selectedCategories = data?.category
        if (!selectedCategories || selectedCategories.length === 0) {
          return {
            id: {
              exists: false,
            },
          }
        }
        return {
          parent: {
            in: selectedCategories,
          },
        }
      },
    },

    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        condition: (data) => !isFotoCategorySelected(data),
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        condition: (data) => !isFotoCategorySelected(data),
      },
    },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      admin: {
        condition: (data) => !isFotoCategorySelected(data),
      },
      filterOptions: ({ id }) => {
        const excludeFotoCondition = {
          or: [
            {
              category: { not_in: [Foto_Category_ID, Infografik_Category_ID] },
            },
            { category: { exists: false } },
            { category: { equals: null } },
          ],
        }
        if (id) {
          return {
            and: [{ id: { not_equals: id } }, excludeFotoCondition],
          }
        }
        return excludeFotoCondition
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
        condition: (data) => isFotoCategorySelected(data),
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
        // Tôi thấy tags cũ của bạn cũng bị sai logic tương tự, nên đã sửa lại luôn
        condition: (data) => !isFotoCategorySelected(data),
        position: 'sidebar',
      },
    },
    {
      name: 'trending',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'highlight',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

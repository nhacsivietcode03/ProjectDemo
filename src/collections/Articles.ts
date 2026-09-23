import type { CollectionConfig } from 'payload'
import { autoFormatSlug } from '@/hooks/autoHook'
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
      hooks: {
        beforeValidate: [autoFormatSlug],
      },
      admin: {
        description: 'Nếu để trống thì tự động lấy title làm slug',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
      // Lọc trường category chỉ gồm những category nào mà không có category cha trong collections category
      filterOptions: () => {
        return {
          parent: {
            exists: false,
          },
        }
      },
    },
    {
      name: 'subCategory',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: false,
      label: 'Sub Category',
      admin: {
        position: 'sidebar',
        // Chỉ hiển thị trường này khi đã chọn Category
        condition: (data) => {
          return Boolean(data?.category)
        },
      },
      // Lọc danh sách: Chỉ hiển thị các Category có parent trùng với Category vừa chọn
      filterOptions: (options) => {
        const selectedCategory = options.data?.category
        if (!selectedCategory) {
          return false
        }
        return {
          parent: {
            equals: selectedCategory,
          },
        }
      },
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
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
    },
  ],
}

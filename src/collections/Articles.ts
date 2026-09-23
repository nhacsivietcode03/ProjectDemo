import type { CollectionConfig } from 'payload'

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
      filterOptions: ({ data }) => {
        if (data?.category) {
          return {
            parent: {
              equals: data.category,
            },
          }
        }
        return false
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

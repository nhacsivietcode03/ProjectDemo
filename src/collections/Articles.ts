import type { CollectionConfig, Where } from 'payload'
import { autoFormatSlug } from '@/hooks/autoHook'
import { revalidateAfterChange } from '@/hooks/revalidateAfterChange'
import { revalidateAfterDelete } from '@/hooks/revalidateAfterDelete'
import { BlocksFeature, FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { AdBlock } from '@/blocks/AdBlock'
import { DisyorkanBlock } from '@/blocks/DisyorkanBlock'

const Foto_Category_ID = '6abc73ef83faa2af854f5e7a'
const Infografik_Category_ID = '6abc73c683faa2af854f5e49'

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
  access: {
    create: () => true,
  },
  hooks: {
    afterChange: [revalidateAfterChange(['articles'])],
    afterDelete: [revalidateAfterDelete(['articles'])],
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
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
        const selectedCategories = data?.category || []

        // 1. Ép kiểu về mảng nếu nó vô tình là 1 giá trị đơn
        const categoryArray = Array.isArray(selectedCategories)
          ? selectedCategories
          : [selectedCategories]

        // 2. BƯỚC QUAN TRỌNG: Trích xuất chính xác chuỗi ID
        // Dù data truyền lên là ['id_1'] hay [{ id: 'id_1' }] thì đều lấy được chuỗi
        const categoryIds = categoryArray
          .map((cat: any) => (typeof cat === 'object' ? cat?.id : cat))
          .filter(Boolean) // Loại bỏ các giá trị null/undefined

        if (categoryIds.length === 0) {
          return {
            id: {
              exists: false,
            },
          }
        }

        return {
          parent: {
            in: categoryIds,
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
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          BlocksFeature({
            blocks: [AdBlock, DisyorkanBlock],
          }),
        ],
      }),
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
      required: true,
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

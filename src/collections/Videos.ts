import { extractYoutubeId } from '@/hooks/extractYoutubeId'
import type { CollectionConfig, Validate } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'video',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    beforeValidate: [extractYoutubeId],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'video',
      options: [
        { label: 'Video', value: 'video' },
        { label: 'Short', value: 'short' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'BH TV', value: 'bthv' },
        { label: 'PodCast', value: 'podcast' },
        { label: 'Sukan', value: 'sukan' },
        { label: 'Borak Hari', value: 'borakhariini' },
        { label: 'BH Tanya', value: 'bhtanya' },
        { label: 'Fakta BH', value: 'faktabh' },
      ],
      admin: {
        condition: (data) => data?.type === 'video',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData.type !== 'video') {
              return null
            }
            return value
          },
        ],
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      required: true,
      validate: ((value) => {
        // Validate URL cơ bản để đảm bảo Editor nhập đúng link Youtube
        const regExp = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/
        if (value && !regExp.test(value)) {
          return 'Vui lòng nhập đường link YouTube hợp lệ'
        }
        return true
      }) satisfies Validate,
    },
    {
      name: 'youtubeId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}

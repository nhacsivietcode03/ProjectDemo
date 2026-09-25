import { getYoutubeId } from '@/utils/getYoutubeId'
import { CollectionBeforeValidateHook } from 'payload'

export const extractYoutubeId: CollectionBeforeValidateHook = ({ data }) => {
  if (!data || typeof data.youtubeUrl !== 'string') {
    return data
  }

  const youtubeId = getYoutubeId(data.youtubeUrl.trim())

  if (!youtubeId) {
    throw new Error('Vui lòng nhập đường dẫn YouTube hợp lệ.')
  }

  return {
    ...data,
    youtubeId,
  }
}

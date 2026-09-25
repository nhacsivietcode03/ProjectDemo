import type { FieldHook } from 'payload'
import { formatSlug } from '@/utils/slugify'

export const autoFormatSlug: FieldHook = ({ value, data, operation, originalDoc }) => {
  const title = typeof data?.title === 'string' ? data.title : undefined
  const titleChanged = operation === 'update' && title !== undefined && title !== originalDoc?.title
  const slugChanged =
    typeof value === 'string' && value.trim() !== '' && value !== originalDoc?.slug

  if (titleChanged && !slugChanged) {
    return formatSlug(title)
  }

  if (typeof value === 'string' && value.trim() !== '') {
    return formatSlug(value)
  }

  if (title !== undefined) {
    return formatSlug(title)
  }

  return value
}

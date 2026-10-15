import { revalidateTag } from 'next/cache'
import type { CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

export const revalidateAfterDelete = (tags: string[]): CollectionAfterDeleteHook => {
  return ({ doc, req: { payload } }) => {
    tags.forEach((tag) => {
      revalidateTag(tag, 'max')
      payload.logger.info(`[Cache Revalidated - Delete]: Đã làm mới tag '${tag}'`)
    })
    return doc
  }
}

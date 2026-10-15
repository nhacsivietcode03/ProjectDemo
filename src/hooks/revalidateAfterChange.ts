import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

export const revalidateAfterChange = (tags: string[]): CollectionAfterChangeHook => {
  return ({ doc, req: { payload } }) => {
    tags.forEach((tag) => {
      revalidateTag(tag, 'max')
      payload.logger.info(`[Cache Revalidated - Change]: Đã làm mới tag '${tag}'`)
    })
    return doc
  }
}

export const revalidateAfterChangeGlobal = (tags: string[]): GlobalAfterChangeHook => {
  return ({ doc, req: { payload } }) => {
    tags.forEach((tag) => {
      revalidateTag(tag, 'max')
      payload.logger.info(`[Cache Revalidated - Change]: Đã làm mới tag '${tag}'`)
    })
    return doc
  }
}

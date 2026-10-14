import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

const globalPayload = globalThis as any
if (!globalPayload.payload) {
  globalPayload.payload = { client: null, promise: null }
}
const cached = globalPayload.payload

export const getPayloadClient = async () => {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    cached.promise = getPayload({ config: buildConfig })
  }

  try {
    cached.client = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }
  return cached.client
}

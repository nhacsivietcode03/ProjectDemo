import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Users } from './collections/Users'
import { collections } from './collections'
import { globals } from './globals'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const blobToken = process.env.BLOB_READ_WRITE_TOKEN

if (!blobToken) {
  throw new Error(
    'BLOB_READ_WRITE_TOKEN is required on Vercel. Connect a Vercel Blob store and redeploy.',
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections,
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      collections: {
        media: true,
      },
      clientUploads: true,
      token: blobToken,
    }),
  ],
})

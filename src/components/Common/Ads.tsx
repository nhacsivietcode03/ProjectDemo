import Image from 'next/image'
import { getPayload } from 'payload'
import buildConfig from '@/payload.config'

type AdSlotProps = {
  slot: '970x90' | '300x250' | '300x600' | '400x200' | '1x1_oop' | 'mgid_native'
  width: number
  height: number
}

export default async function AdSlot({ slot, width, height }: AdSlotProps) {
  const payload = await getPayload({ config: buildConfig })
  const { banners } = await payload.findGlobal({
    slug: 'ads',
    depth: 1,
  })

  const banner = banners?.find((banner) => banner.slot === slot)

  if (!banner || typeof banner.image !== 'object' || !banner.image.url) return null

  return (
    <Image
      src={banner.image.url}
      alt={banner.image.alt ?? ''}
      width={width}
      height={height}
      className="mx-auto block max-w-full object-cover"
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  )
}

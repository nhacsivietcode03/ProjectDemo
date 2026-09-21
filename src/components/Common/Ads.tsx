import Image from 'next/image'
import getAds from '@/data/common/getAds'

type AdSlotProps = {
  slot: '970x90' | '300x250' | '300x600' | '400x200' | '300x300' | 'mgid_native'
  width: number
  height: number
}

export default async function AdSlot({ slot, width, height }: AdSlotProps) {
  const banners = await getAds()
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

import Image from 'next/image'
import { getAdData } from '@/data'

type AdSlotProps = {
  slot: '970x90' | '300x250' | '300x600' | '400x200' | '300x300' | '320x100'
  width: number
  height: number
  className?: string
}

export default async function AdSlot({ slot, width, height, className = '' }: AdSlotProps) {
  const adData = await getAdData()
  const banner = adData.banners?.find((banner) => banner.slot === slot)

  if (!banner || typeof banner.image !== 'object' || !banner.image.url) return null
  return (
    <Image
      src={banner.image.url}
      alt={banner.image.alt ?? 'Advertisement'}
      width={width}
      height={height}
      className={`mx-auto block max-w-full object-cover ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  )
}

import Image from 'next/image'
import { getGlobalsData } from '@/data'

type AdSlotProps = {
  slot: '970x90' | '300x250' | '300x600' | '400x200' | '300x300'
  width: number
  height: number
}

export default async function AdSlot({ slot, width, height }: AdSlotProps) {
  const { adData } = await getGlobalsData()
  const banner = adData.banners?.find((banner) => banner.slot === slot)
  if (!banner || typeof banner.image !== 'object' || !banner.image.url) return null

  return (
    <Image
      src={banner.image.url}
      alt={banner.image.alt ?? ''}
      width={width}
      height={height}
      className={`mx-auto my-2 block max-w-full object-cover ${
        slot === '970x90' ? 'h-[100px] w-full lg:h-[90px] lg:w-[970px]' : ''
      }`}
      style={slot === '970x90' ? undefined : { width: `${width}px`, height: `${height}px` }}
    />
  )
}

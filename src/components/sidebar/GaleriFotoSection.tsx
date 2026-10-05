import Image from 'next/image'
import HeaderTitle from '../common/HeaderTitle'
import type { GaleriItem } from '@/data/getSideBarData'

type GaleriFotoProps = {
  galeriData: GaleriItem[]
}

export default function GaleriFotoSection({ galeriData }: GaleriFotoProps) {
  const galleryImages = galeriData.flatMap((galeri) => galeri.galleryImages ?? [])
  return (
    <section className="my-3">
      {/*Header Section*/}
      <HeaderTitle title="Galeri Foto" label="Galeri" />
      {/*Render ảnh*/}
      <div className="grid grid-cols-4 gap-1">
        {galleryImages.map((galeri, index) => {
          const galeriImage = galeri && typeof galeri.image === 'object' ? galeri.image : null
          if (!galeriImage?.url) return null
          return (
            <div key={index} className="relative aspect-4/3">
              <Image src={galeriImage.url} alt={galeriImage.alt} fill className="object-cover" />
            </div>
          )
        })}
      </div>
    </section>
  )
}

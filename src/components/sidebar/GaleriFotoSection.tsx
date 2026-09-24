import Image from 'next/image'
import getGaleriFoto from '@/data/sidebar/getGaleriFoto'
import HeaderTitle from '../common/HeaderSection'
import { Media } from '@/payload-types'

export default async function GaleriFotoSection() {
  // Lấy dữ liệu từ galerifoto
  const articles = await getGaleriFoto()
  const galleryImages = articles.flatMap((article) => article.galleryImages ?? [])

  return (
    <section className="mt-3">
      <HeaderTitle title="Galeri Foto" label="Galeri" />
      <div className="grid grid-cols-4 gap-1 py-4">
        {galleryImages.map((galleryImage, index) => {
          const image =
            galleryImage && typeof galleryImages === 'object' ? (galleryImage.image as Media) : null
          if (!image?.url) return null
          return (
            <div key={galleryImage.id ?? `${image.id}-${index}`} className="relative aspect-4/3">
              <Image src={image.url} alt={galleryImage.caption} fill className="object-cover" />
            </div>
          )
        })}
      </div>
    </section>
  )
}

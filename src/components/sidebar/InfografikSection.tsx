import getInfografik from '@/data/sidebar/getInfografik'
import HeaderTitle from '../common/HeaderSection'
import Image from 'next/image'

export default async function InfografikSection() {
  const [infografik] = await getInfografik()
  const imageInfografik =
    infografik && typeof infografik.Image === 'object' ? infografik.Image : null

  return (
    <section className="mt-3">
      <HeaderTitle title="Infogtafik" />
      {imageInfografik?.url && (
        <Image
          src={imageInfografik.url}
          alt={imageInfografik.alt || ''}
          width={imageInfografik.width || 1}
          height={imageInfografik.height || 1}
          className="h-auto w-full py-4"
        />
      )}
    </section>
  )
}

import type { InfografikItem } from '@/data/sidebar/getSideBarData'
import HeaderTitle from '../common/HeaderSection'
import Image from 'next/image'

type InfografikProps = {
  infografikData: InfografikItem[]
}

export default async function InfografikSection({ infografikData }: InfografikProps) {
  const [infografik] = infografikData
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

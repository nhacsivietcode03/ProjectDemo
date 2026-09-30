import AdSlot from '@/components/common/Ads'
import {
  GaleriFotoSection,
  InfografikSection,
  PodCastSection,
  Terkini,
  TrendingSection,
} from '@/components/sidebar'
import { Utama, Disyorkan, Rencana, Sukan, Dunia, Bisnes } from '@/components/homepage'
import getSideBarData from '@/data/sidebar/getSideBarData'
import getMainHomePageData from '@/data/homepage/getMainHomePageData'
import Hiburan from '@/components/homepage/Hiburan'

export default async function HomePage() {
  const { galeriData, infografikData, terkiniData, trendingData, videosData } =
    await getSideBarData()
  const { utamaData, disyorkanData, rencanaData, sukanData, duniaData, bisnesData, hiburanData } =
    await getMainHomePageData()

  return (
    <div className="container pt-5">
      {/* Utama */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Utama utamaData={utamaData} />
        </div>
        <div className="lg:col-span-4">
          <AdSlot slot="300x250" width={300} height={250} />
          <Terkini terkiniData={terkiniData} />
          <TrendingSection trendingData={trendingData} />
        </div>
      </div>
      {/* Disyorkan */}
      <Disyorkan disyorkanData={disyorkanData} />
      {/* Rencana */}
      <Rencana rencanaData={rencanaData} />
      {/* Sukan */}
      <Sukan sukanData={sukanData} />
      <div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Bisnes bisnesData={bisnesData} />
            <Hiburan hiburanData={hiburanData} />
          </div>
          <div className="lg:col-span-4">
            <div className="hidden lg:block">
              <AdSlot slot="300x250" width={300} height={250} />
            </div>
            <PodCastSection podCastData={videosData} />
          </div>
        </div>
      </div>
      <Dunia duniaData={duniaData} />
    </div>
  )
}
{
  /* 
          <InfografikSection infografikData={infografikData} />
          <GaleriFotoSection galeriData={galeriData} /> */
}

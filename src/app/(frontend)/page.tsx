import AdSlot from '@/components/common/Ads'
import {
  GaleriFotoSection,
  InfografikSection,
  PodCastSection,
  Terkini,
  TrendingSection,
} from '@/components/sidebar'
import { Utama } from '@/components/homepage'
import getSideBarData from '@/data/sidebar/getSideBarData'
import getMainHomePageData from '@/data/homepage/getMainHomePageData'

export default async function HomePage() {
  const { galeriData, infografikData, terkiniData, trendingData, videosData } =
    await getSideBarData()
  const { utamaData } = await getMainHomePageData()
  return (
    <div className="container pt-5">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
        {/* Phần nội dung chính */}
        <div className="lg:col-span-8">
          <Utama utamaData={utamaData} />
        </div>
        {/* Phần nội dung sideBar */}
        <div className="lg:col-span-4">
          <AdSlot slot="300x250" width={300} height={250} />
          <Terkini terkiniData={terkiniData} />
          <TrendingSection trendingData={trendingData} />
        </div>
      </div>
    </div>
  )
}
{
  /* <PodCastSection podCastData={videosData} />
          <InfografikSection infografikData={infografikData} />
          <GaleriFotoSection galeriData={galeriData} /> */
}

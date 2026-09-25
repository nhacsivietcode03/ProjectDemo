import AdSlot from '@/components/common/Ads'
import {
  GaleriFotoSection,
  InfografikSection,
  PodCastSection,
  Terkini,
  TrendingSection,
} from '@/components/sidebar'
import getSideBarData from '@/data/sidebar/getSideBarData'

export default async function HomePage() {
  const { galeriData, infografikData, terkiniData, trendingData, videosData } =
    await getSideBarData()
  return (
    <div className="container pt-5">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
        {/* Phần nội dung chính */}
        <div className="lg:col-span-8"></div>
        {/* Phần nội dung sideBar */}
        <div className="lg:col-span-4">
          <AdSlot slot="300x250" width={300} height={250} />
          <Terkini terkiniData={terkiniData} />
          <TrendingSection trendingData={trendingData} />
          <PodCastSection podCastData={videosData} />
          <InfografikSection infografikData={infografikData} />
          <GaleriFotoSection galeriData={galeriData} />
        </div>
      </div>
    </div>
  )
}

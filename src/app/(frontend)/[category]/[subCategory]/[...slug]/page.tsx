import { BeritaBerkaitan } from '@/components/article'
import { AdSlot } from '@/components/common'
import { VideoTerkini } from '@/components/homepage'
import {
  GaleriFotoSection,
  InfografikSection,
  PodCastSection,
  Terkini,
  TrendingSection,
} from '@/components/sidebar'
import { getMainHomePageData, getSideBarData } from '@/data'

export default async function ArticleDetailPage() {
  const [sideBarData, mainHomePageData] = await Promise.all([
    getSideBarData(),
    getMainHomePageData(),
  ])
  const { galeriData, infografikData, terkiniData, trendingData, videosData } = sideBarData
  const { utamaData, videoTerkiniData } = mainHomePageData
  return (
    <div className="container pt-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <VideoTerkini videoTerkiniData={videoTerkiniData} />
          <BeritaBerkaitan beritaBerkaitanData={utamaData} />
        </div>
        <div className="lg:col-span-4">
          <AdSlot slot="300x250" width={300} height={250} className="hidden lg:block" />
          <AdSlot slot="300x600" width={300} height={600} className="lg:hidden" />
          <Terkini terkiniData={terkiniData} />
          <TrendingSection trendingData={trendingData} />
          <AdSlot slot="300x600" width={300} height={600} className="hidden lg:block" />
          <PodCastSection podCastData={videosData} />
          <AdSlot slot="300x250" width={300} height={250} className="hidden lg:block" />
          <InfografikSection infografikData={infografikData} />
          <GaleriFotoSection galeriData={galeriData} />
        </div>
      </div>
    </div>
  )
}

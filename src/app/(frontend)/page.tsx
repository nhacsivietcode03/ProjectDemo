import AdSlot from '@/components/common/Ads'
import {
  GaleriFotoSection,
  InfografikSection,
  PodCastSection,
  Terkini,
  TrendingSection,
} from '@/components/sidebar'
import { Utama, Disyorkan, BHPLUS, BHTV, VideoTerkini } from '@/components/homepage'
import { getMainHomePageData, getSideBarData } from '@/data'
import {
  Horizontal6Articles,
  Vertical6Articles,
  VerticalAriclesInColumn,
} from '@/components/article'

export default async function HomePage() {
  const { galeriData, infografikData, terkiniData, trendingData, videosData } =
    await getSideBarData()
  const {
    utamaData,
    disyorkanData,
    rencanaData,
    sukanData,
    duniaData,
    bisnesData,
    hiburanData,
    gayaHidupData,
    siHatData,
    bhplusData,
    bhtvData,
    videoTerkiniData,
  } = await getMainHomePageData()

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
      {/* VideoTerkini */}
      <VideoTerkini videoTerkiniData={videoTerkiniData} />
      {/* Rencana */}
      <Horizontal6Articles data={rencanaData} />
      {/* BHTV */}
      <BHTV bhtvData={bhtvData} />
      {/* Sukan */}
      <Horizontal6Articles data={sukanData} />
      <div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {/* Bines */}
            <Vertical6Articles data={bisnesData} />
            {/* Hiburan */}
            <Vertical6Articles data={hiburanData} />
          </div>
          <div className="lg:col-span-4">
            <div className="hidden lg:block">
              <AdSlot slot="300x250" width={300} height={250} />
            </div>
            <PodCastSection podCastData={videosData} />
          </div>
        </div>
      </div>
      <Horizontal6Articles data={duniaData} />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <VerticalAriclesInColumn data={gayaHidupData} />{' '}
            <VerticalAriclesInColumn data={siHatData} />
          </div>
          <BHPLUS bhplusData={bhplusData} />
        </div>
        <div className="lg:col-span-4">
          <InfografikSection infografikData={infografikData} />
          <GaleriFotoSection galeriData={galeriData} />
        </div>
      </div>
    </div>
  )
}

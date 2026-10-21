import { getMainHomePageData } from '@/data'
import { VideoTerkini } from '../homepage'
import BeritaBerkaitan from '../article/BeritaBerkaitan'

export default async function FooterArticleDetail() {
  const { utamaData, videoTerkiniData } = await getMainHomePageData()
  return (
    <div>
      <VideoTerkini videoTerkiniData={videoTerkiniData} />
      <BeritaBerkaitan beritaBerkaitanData={utamaData} />
    </div>
  )
}

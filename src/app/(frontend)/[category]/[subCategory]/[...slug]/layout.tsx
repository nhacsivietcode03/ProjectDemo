
import { VideoTerkini } from '@/components/homepage'
import { getMainHomePageData } from '@/data'
import { BeritaBerkaitan } from '@/components/article'

export default async function ArticleLayout({ children }: { children: React.ReactNode }) {
  const { utamaData, videoTerkiniData } = await getMainHomePageData()
  return (
    <div>
      {children}
      <VideoTerkini videoTerkiniData={videoTerkiniData} />
      <BeritaBerkaitan beritaBerkaitanData={utamaData} />
    </div>
  )
}

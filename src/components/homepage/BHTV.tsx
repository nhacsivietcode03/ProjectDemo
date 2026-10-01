import type { VideoItem } from '@/data/homepage/getMainHomePageData'
import { HeaderTitle, VideoComp, VideoThumbnail } from '../common'

type BHTVProps = {
  bhtvData: VideoItem[]
}

export default async function BHTV({ bhtvData }: BHTVProps) {
  const firstVideo = bhtvData[0]
  const restLink = bhtvData.slice(1)
  return (
    <section>
      <HeaderTitle title="BHTV" label="BHTV" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-6">{firstVideo && <VideoComp video={firstVideo} />}</div>
        <div className="grid grid-cols-2 gap-5 lg:col-span-6 lg:grid-cols-3">
          {restLink.map((video) => (
            <VideoThumbnail key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  )
}

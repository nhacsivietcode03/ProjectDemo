import type { PodcastItem } from '@/data/sidebar/getSideBarData'
import HeaderTitle from '../common/HeaderTitle'
import VideoComp from '../common/VideoComp'

type PodcastProps = {
  podCastData: PodcastItem[]
}

export default function PodCastSection({ podCastData }: PodcastProps) {
  return (
    <section className="pb-5">
      <HeaderTitle title="PodCast" label="BH TV" />
      <div className="flex flex-col gap-8">
        {podCastData.map((podCast) => (
          <VideoComp video={podCast as any} type="podCast" key={podCast.id} />
        ))}
      </div>
    </section>
  )
}

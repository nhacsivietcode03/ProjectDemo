import type { PodcastItem } from '@/data/sidebar/getSideBarData'
import HeaderTitle from '../common/HeaderSection'
import VideoComp from '../common/VideoComp'

type PodcastProps = {
  podCastData: PodcastItem[]
}

export default function PodCastSection({ podCastData }: PodcastProps) {
  return (
    <section className="pb-5">
      <HeaderTitle title="PodCast" label="BH TV" />
      {podCastData.map((podCast) => (
        <VideoComp video={podCast} key={podCast.id} />
      ))}
    </section>
  )
}

import getPodCasts from '@/data/sidebar/getVideos'
import HeaderTitle from '../common/HeaderSection'
import Video from '../common/Video'

export default async function PodCastSection() {
  const podCastLists = await getPodCasts()
  return (
    <section className="pb-5">
      <HeaderTitle title="PodCast" label="BH TV" />
      {podCastLists.map((podCast) => (
        <Video video={podCast} key={podCast.id} />
      ))}
    </section>
  )
}

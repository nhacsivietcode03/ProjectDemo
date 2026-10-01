import type { VideoItem } from '@/data/homepage/getMainHomePageData'
import { HeaderTitle } from '../common'

type BHTVProps = {
  bhtvData: VideoItem[]
}

export default async function BHTV({ bhtvData }: BHTVProps) {
  return (
    <section>
      <HeaderTitle title="BHTV" label="bhtv" />
    </section>
  )
}

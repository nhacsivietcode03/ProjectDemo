import type { ArticleItem } from '@/data/homepage/getMainHomePageData'
import { HeaderTitle } from '../common'
import { Horizontal6Articles } from '../article'

type RencanaProps = {
  rencanaData: ArticleItem[]
}

export default async function Rencana({ rencanaData }: RencanaProps) {
  return (
    <section>
      <HeaderTitle title="Rencana" label="Rencana" />
      <Horizontal6Articles data={rencanaData} />
    </section>
  )
}

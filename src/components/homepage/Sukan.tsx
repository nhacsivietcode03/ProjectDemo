import type { ArticleItem } from '@/data/homepage/getMainHomePageData'
import { HeaderTitle } from '../common'
import { Horizontal6Articles } from '../article'

type SukanProps = {
  sukanData: ArticleItem[]
}

export default async function Sukan({ sukanData }: SukanProps) {
  return (
    <section>
      <HeaderTitle title="Sukan" label="Sukan" />
      <Horizontal6Articles data={sukanData} />
    </section>
  )
}

import type { ArticleItem } from '@/data/homepage/getMainHomePageData'
import { HeaderTitle } from '../common'
import { Vertical6Articles } from '../article'

type BisnesProps = {
  bisnesData: ArticleItem[]
}

export default async function Bines({ bisnesData }: BisnesProps) {
  return (
    <section>
      <HeaderTitle title="Bisnes" label="Bisnes" />
      <Vertical6Articles data={bisnesData} />
    </section>
  )
}

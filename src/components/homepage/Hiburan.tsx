import type { ArticleItem } from '@/data/homepage/getMainHomePageData'
import { HeaderTitle } from '../common'
import { Vertical6Articles } from '../article'

type BisnesProps = {
  hiburanData: ArticleItem[]
}

export default async function Hiburan({ hiburanData }: BisnesProps) {
  return (
    <section>
      <HeaderTitle title="Hiburan" label="hiburan" />
      <Vertical6Articles data={hiburanData} />
    </section>
  )
}

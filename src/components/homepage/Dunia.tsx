import type { ArticleItem } from '@/data/homepage/getMainHomePageData'
import { HeaderTitle } from '../common'
import { Horizontal6Articles } from '../article'

type DuniaProps = {
  duniaData: ArticleItem[]
}

export default async function Dunia({ duniaData }: DuniaProps) {
  return (
    <section>
      <HeaderTitle title="Dunia" label="Dunia" />
      <Horizontal6Articles data={duniaData} />
    </section>
  )
}

import type { ArticleItem } from '@/data/getMainHomePageData'
import { HeaderTitle } from '../common'
import { VerticalAriclesInColumn } from '../article'

type BHPLUSProps = {
  bhplusData: ArticleItem[]
}

export default async function BHPLUS({ bhplusData }: BHPLUSProps) {
  const first3Articles = bhplusData.slice(0, 3)
  const restArticles = bhplusData.slice(3)
  return (
    <section>
      <HeaderTitle title="BHPLus" label="bhplus" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <VerticalAriclesInColumn data={first3Articles} showHeader={false} />
        <VerticalAriclesInColumn data={restArticles} showHeader={false} />
      </div>
    </section>
  )
}

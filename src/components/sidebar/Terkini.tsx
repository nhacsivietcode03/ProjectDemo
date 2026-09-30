import ArticleListItem from '@/components/article/ArticleListItem'
import type { TerkiniItem } from '@/data/sidebar/getSideBarData'
import HeaderTitle from '../common/HeaderSection'

type TerkiniProps = {
  terkiniData: TerkiniItem[]
}

export default function Terkini({ terkiniData }: TerkiniProps) {
  return (
    <section className="mt-2">
      <HeaderTitle title="Terkini" />
      <div>
        {terkiniData.map((article) => (
          <div key={article.id} className="relative">
            <ArticleListItem article={article} />
          </div>
        ))}
      </div>
    </section>
  )
}

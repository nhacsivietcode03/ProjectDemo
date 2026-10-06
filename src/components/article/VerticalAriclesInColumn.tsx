import type { ArticleItem } from '@/data/getMainHomePageData'
import CommonArticle from './CommonArticles'
import ArticleListItem from './ArticleListItem'
import { HeaderTitle } from '../common'
import { formatArticle } from '@/utils'

type ComponentsProps = {
  data: ArticleItem[]
  showHeader?: boolean
}
export default async function VerticalAriclesInColumn({
  data,
  showHeader = true,
}: ComponentsProps) {
  if (!data?.length) return null

  const FirstArticles = data.slice(0, 1)
  const RestArtciels = data.slice(1)

  const { categoryTitle } = formatArticle(FirstArticles[0])

  return (
    <div>
      {showHeader && <HeaderTitle title={categoryTitle || ''} label={categoryTitle} />}

      <div className={`grid grid-cols-1 gap-3 lg:grid-cols-1 ${showHeader ? 'mt-5' : 'mt-0'}`}>
        <div className="mb-2 border-b border-gray-200 pb-2">
          <CommonArticle articlesData={FirstArticles} type="big" />
        </div>

        <div className="gap-3">
          {RestArtciels.map((article) => (
            <ArticleListItem key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}

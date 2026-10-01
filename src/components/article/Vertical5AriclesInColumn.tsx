import type { ArticleItem } from '@/data/homepage/getMainHomePageData'
import CommonArticle from './CommonArticles'
import ArticleListItem from './ArticleListItem'
import { HeaderTitle } from '../common'
import formatArticle from '@/utils/formatArticles'

type ComponentsProps = {
  data: ArticleItem[]
}

export default async function Vertical5AriclesInColumn({ data }: ComponentsProps) {
  if (!data) return null
  const FirstArticles = data.slice(0, 1)
  const RestArtciels = data.slice(1)
  const { categoryTitle } = formatArticle(FirstArticles[0])
  return (
    <div>
      <HeaderTitle title={categoryTitle || ''} label={categoryTitle} />
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-1">
        <div className="mb-2 border-b border-gray-200 pb-2">
          <CommonArticle articlesData={FirstArticles} type="big" />
        </div>
        {RestArtciels.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

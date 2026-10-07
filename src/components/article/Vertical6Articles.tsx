import type { ArticleItem } from '@/data/getMainHomePageData'
import CommonArticle from './CommonArticles'
import ArticleListItem from './ArticleListItem'
import { HeaderTitle } from '../common'
import { formatArticle } from '@/utils'

type ComponentsProps = {
  data: ArticleItem[]
}

export default async function Verticle6Articles({ data }: ComponentsProps) {
  if (!data) return null
  const First2Articles = data.slice(0, 2)
  const RestArtciels = data.slice(2)
  const { categoryTitle } = formatArticle(First2Articles[0])
  return (
    <div>
      <HeaderTitle title={categoryTitle || ''} label={categoryTitle} />
      <div className="mt-5 grid grid-cols-1 gap-5 border-b border-gray-300 dark:border-gray-700 lg:grid-cols-2">
        <CommonArticle articlesData={First2Articles} type="big" />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-2 lg:grid-cols-2">
        {RestArtciels.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

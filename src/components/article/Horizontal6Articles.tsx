import type { ArticleItem } from '@/data/homepage/getMainHomePageData'
import CommonArticle from './CommonArticles'
import ArticleListItem from './ArticleListItem'

type RencanaProps = {
  data: ArticleItem[]
}

export default async function Horizontal6Articles({ data }: RencanaProps) {
  const First2Articles = data.slice(0, 2)
  const RestArtciels = data.slice(2)
  return (
    <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <CommonArticle articlesData={First2Articles} type="big" />
        </div>
      </div>
      <div className="lg:col-span-4">
        {RestArtciels.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

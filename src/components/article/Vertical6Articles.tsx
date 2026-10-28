import type { ArticleItem } from '@/data/getMainHomePageData'
import CommonArticle from './CommonArticles'
import ArticleListItem from './ArticleListItem'
import { HeaderTitle } from '../common'
import { formatArticle } from '@/utils'

type ComponentsProps = {
  data: ArticleItem[],
  typeTitle?: string
}

// Nhận thêm typeTitle từ Props
export default async function Verticle6Articles({ data, typeTitle }: ComponentsProps) {
  // Chặn thêm trường hợp data là mảng rỗng []
  if (!data || data.length === 0) return null

  const First2Articles = data.slice(0, 2)
  const RestArtciels = data.slice(2)

  const { categoryTitle, subCategoryTitle } = formatArticle(First2Articles[0])


  const isSubCategory = typeTitle === 'subCategory'
  const displayTitle = isSubCategory ? subCategoryTitle : categoryTitle

  const targetHref = isSubCategory
    ? `/${categoryTitle}/${subCategoryTitle}`
    : `/${subCategoryTitle}`

  return (
    <div>
      <HeaderTitle title={displayTitle || ''} href={targetHref} label={displayTitle} />

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
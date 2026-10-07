import Link from 'next/link'
import type { ArticleItem } from '@/data/getMainHomePageData'
import Image from 'next/image'
import { formatArticle } from '@/utils'
import ArticleTime from './ArticleTime'

type ArticleProps = {
  articlesData: ArticleItem[]
  type?: 'normal' | 'big'
}

export default function CommonArticle({ articlesData, type = 'normal' }: ArticleProps) {
  if (!articlesData?.length) return null

  return (
    <>
      {articlesData.map((article) => {
        const { image, subCategoryTitle, articleUrl, categoryTitle } = formatArticle(article)

        return (
          <Link key={article.id} href={articleUrl} className="group block">
            <div
              className={`relative w-full overflow-hidden bg-gray-200 dark:bg-gray-700 ${
                type === 'big' ? 'aspect-4/3' : 'aspect-video'
              }`}
            >
              {image?.url && (
                <Image
                  src={image.url}
                  alt={image.alt || article.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              )}
            </div>

            {/* Thông tin */}
            <div className="w-full py-3">
              <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
                <p className="font-semibold text-red-600 uppercase">
                  {subCategoryTitle || categoryTitle}
                </p>
                <ArticleTime date={article.createdAt} className="text-gray-500 dark:text-gray-400" />
              </div>

              <h3 className="line-clamp-2 min-h-10.5 text-sm font-semibold text-black transition-colors group-hover:text-red-600 dark:text-white">
                {article.title}
              </h3>
            </div>
          </Link>
        )
      })}
    </>
  )
}

import Link from 'next/link'
import type { ArticleItem } from '@/data/homepage/getMainHomePageData'
import Image from 'next/image'
import getTimeAgo from '@/utils/getTimeAgo'

type ArticleProps = {
  articlesData: ArticleItem[]
  type?: 'normal' | 'big'
}

export default function CommonArticle({ articlesData, type = 'normal' }: ArticleProps) {
  if (!articlesData?.length) return null

  return (
    <>
      {articlesData.map((article) => {
        const image = typeof article.Image === 'object' ? article.Image : null
        const subCategory = article.subCategory?.[0]
        const subCategorySlug = typeof subCategory === 'object' ? subCategory?.slug : 'NASIONAL'
        const subCategoryTitle = typeof subCategory === 'object' ? subCategory?.title : 'NASIONAL'
        const mainCategory = article.category?.[0]
        const categorySlug = typeof mainCategory === 'object' ? mainCategory?.slug : null

        const date = new Date(article.createdAt)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const id = article.id
        const articleSlug = article.slug || ''

        const articleUrl = subCategory
          ? `/${categorySlug}/${subCategorySlug}/${year}/${month}/${id}/${articleSlug}`
          : `/${categorySlug}/${year}/${month}/${id}/${articleSlug}`

        return (
          <Link key={article.id} href={articleUrl} className="group block">
            <div
              className={`relative w-full overflow-hidden bg-gray-200 ${
                type === 'big' ? 'aspect-square' : 'aspect-video'
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
                <p className="font-semibold text-red-600 uppercase">{subCategoryTitle}</p>
                <p className="text-gray-400">{getTimeAgo(article.createdAt)}</p>
              </div>

              <h3 className="line-clamp-2 text-sm font-semibold text-black transition-colors group-hover:text-red-600">
                {article.title}
              </h3>
            </div>
          </Link>
        )
      })}
    </>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import type { ArticleItem } from '@/data/getMainHomePageData'
import { formatArticle } from '@/utils'
import ArticleTime from './ArticleTime'

type HeroArticleProps = {
  data: ArticleItem[] | ArticleItem
}

export default function HeroArticle({ data }: HeroArticleProps) {
  const article = Array.isArray(data) ? data[0] : data

  if (!article) return null

  const { image, subCategoryTitle, subCategory, articleUrl } = formatArticle(article)

  return (
    <article className="-mx-8 flex flex-col lg:mx-0 lg:w-full">
      <Link href={articleUrl} className="group relative block w-full overflow-hidden">
        {/* Khung ảnh */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-200 dark:bg-gray-700 lg:aspect-video">
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              priority
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-800 text-sm text-gray-400">
              No image
            </div>
          )}

          {/* Lớp phủ gradient đen (Chỉ hiện ở Mobile) */}
          <div className="absolute inset-0 z-10 bg-linear-to-t from-black/90 via-black/40 to-transparent lg:hidden" />
        </div>

        {/* Nội dung đè lên ảnh (Mobile) */}
        <div className="absolute bottom-0 left-0 z-20 w-full px-5 py-4 lg:relative lg:mt-3 lg:px-0 lg:py-1">
          {/* SubCategory + Thời gian */}
          {subCategory && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#e1161e] uppercase sm:text-sm">
                {subCategoryTitle}
              </span>
              <ArticleTime
                date={article.createdAt}
                className="text-xs text-gray-300 lg:text-gray-500 lg:dark:text-gray-400"
              />
            </div>
          )}

          {/* Tiêu đề chính */}
          <h2 className="mt-1 line-clamp-3 text-lg leading-snug font-bold text-white transition-colors group-hover:text-[#e1161e] sm:text-xl lg:line-clamp-2 lg:text-2xl lg:text-black lg:dark:text-white">
            {article.title}
          </h2>

          {/* Đoạn tóm tắt */}
          {article.excerpt && (
            <p className="mt-2 line-clamp-2 hidden text-sm leading-relaxed text-gray-700 dark:text-gray-300 lg:block">
              {article.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}

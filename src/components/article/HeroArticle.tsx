import Link from 'next/link'
import Image from 'next/image'
import type { ArticleItem } from '@/data/getMainHomePageData'
import { formatArticle } from '@/utils'
import ArticleTime from '../article/ArticleTime'

type HeroArticleProps = {
  data: ArticleItem[] | ArticleItem
}

export default function HeroArticle({ data }: HeroArticleProps) {
  const article = Array.isArray(data) ? data[0] : data

  if (!article) return null

  const { image, subCategoryTitle, subCategory, articleUrl } = formatArticle(article)

  return (
    // ĐÃ SỬA: Dùng margin âm (-mx-4 hoặc -mx-5 tuỳ padding của container) để tràn viền trên mobile.
    // Xoá w-full ở mobile để nó tự động giãn nở theo margin âm, md:mx-0 để reset trên desktop.
    <article className="-mx-6 flex flex-col md:mx-0 md:w-full">
      <Link href={articleUrl} className="group relative block w-full overflow-hidden">
        {/* Khung ảnh: Dùng aspect-video */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
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

          {/* Lớp phủ gradient đen từ dưới lên (Chỉ hiện ở Mobile) */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:hidden" />
        </div>

        {/* Nội dung đè lên ảnh (Mobile) / Nằm dưới ảnh (Desktop) */}
        <div className="absolute bottom-0 left-0 z-20 w-full px-5 py-4 md:relative md:mt-3 md:px-0 md:py-1">
          {/* SubCategory + Thời gian */}
          {subCategory && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#e1161e] uppercase sm:text-sm">
                {subCategoryTitle}
              </span>
              <ArticleTime
                date={article.createdAt}
                className="text-xs text-gray-300 md:text-gray-500"
              />
            </div>
          )}

          {/* Tiêu đề chính */}
          <h2 className="mt-1 line-clamp-3 text-lg leading-snug font-bold text-white transition-colors group-hover:text-[#e1161e] sm:text-xl md:line-clamp-2 md:text-2xl md:text-black">
            {article.title}
          </h2>

          {/* Đoạn tóm tắt (Ẩn ở mobile) */}
          {article.excerpt && (
            <p className="mt-2 line-clamp-2 hidden text-sm leading-relaxed text-gray-700 md:block">
              {article.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}

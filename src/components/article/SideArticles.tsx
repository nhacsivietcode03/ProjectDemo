import Link from 'next/link'
import Image from 'next/image'
import type { ArticleItem } from '@/data/getMainHomePageData'
import { formatArticle, getTimeAgo } from '@/utils'

type SideArticleProps = {
  data: ArticleItem[]
}

export default function SideArticles({ data }: SideArticleProps) {
  if (!data?.length) return null

  return (
    <div className="flex flex-col gap-5">
      {data.map((article) => {
        const { image, subCategoryTitle, articleUrl } = formatArticle(article)

        return (
          <Link key={article.id} href={articleUrl} className="group relative block overflow-hidden">
            <div className="relative aspect-video w-full">
              {/* Ảnh nền */}
              {image?.url && (
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  priority
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              )}
            </div>
            {/* Gradient đen làm tối phần dưới để đọc chữ */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

            {/* Thông tin bài viết */}
            <div className="absolute inset-x-0 bottom-0 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs">
                {/* Subcategory màu đỏ */}
                <span className="font-semibold text-red-600 uppercase">{subCategoryTitle}</span>
                <span className="text-gray-300">{getTimeAgo(article.createdAt)}</span>
              </div>

              <h3 className="line-clamp-2 text-xs font-semibold text-white group-hover:text-red-400">
                {article.title}
              </h3>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

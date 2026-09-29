import Link from 'next/link'
import Image from 'next/image'
import type { UtamaItem } from '@/data/homepage/getMainHomePageData'
import getTimeAgo from '@/utils/getTimeAgo'

type HeroArticleProps = {
  data: UtamaItem[]
}

export default function HeroArticle({ data }: HeroArticleProps) {
  const article = Array.isArray(data) ? data[0] : data

  if (!article) return null

  const image = typeof article.Image === 'object' ? article.Image : null

  const subCategory = article.subCategory?.[0]
  const subCategoryTitle = typeof subCategory === 'object' ? subCategory?.title : 'NASIONAL'
  return (
    <article className="flex flex-col px-2">
      <Link href={`/berita/${article.slug || ''}`} className="group block">
        {/* Ảnh lớn Hero: Chiều cao 284px khớp chuẩn với (Card 1: 138px + Gap: 8px + Card 2: 138px) */}
        <div className="relative h-[350px] w-full overflow-hidden bg-gray-200">
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
        </div>

        {/* Nội dung bên dưới ảnh */}
        <div className="mt-3">
          {/* SubCategory màu đỏ + Thời gian */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-red-600 capitalize">
              {subCategoryTitle}
            </span>
            <span className="text-xs text-gray-400">{getTimeAgo(article.createdAt)}</span>
          </div>

          {/* Tiêu đề chính */}
          <h2 className="mt-1 line-clamp-2 text-xl leading-snug font-semibold text-black transition-colors group-hover:text-red-600 sm:text-2xl">
            {article.title}
          </h2>

          {/* Đoạn tóm tắt excerpt */}
          {article.excerpt && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-700">
              {article.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}

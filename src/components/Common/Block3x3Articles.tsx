import Link from 'next/link'
import type { UtamaItem } from '@/data/homepage/getMainHomePageData'
import Image from 'next/image'
import getTimeAgo from '@/utils/getTimeAgo'

export default function Block3x3Articles({ data }: { data: UtamaItem[] }) {
  if (!data?.length) return null

  return (
    <article>
      <div className="mt-5 grid grid-cols-1 gap-2 lg:grid-cols-3">
        {data.map((article) => {
          const image = typeof article.Image === 'object' ? article.Image : null
          const subCategory = article.subCategory?.[0]
          const subCategoryTitle = typeof subCategory === 'object' ? subCategory?.title : 'NASIONAL'
          return (
            <Link
              key={article.id}
              href={`/berita/${article.slug || ''}`}
              className="group relative block overflow-hidden"
            >
              {/* Ảnh nền */}
              {image?.url && (
                <Image
                  src={image.url}
                  alt={image.alt || article.title}
                  width={257}
                  height={150}
                  className="overflow-hidden object-cover transition duration-300 group-hover:scale-105"
                  style={{ width: `${290}px`, height: `${150}px` }}
                />
              )}

              {/* Thông tin bài viết */}
              <div className="inset-x-0 bottom-0 py-3">
                <div className="mb-1 flex items-center gap-2 text-xs">
                  {/* Subcategory màu đỏ */}
                  <span className="font-semibold text-red-600 uppercase">{subCategoryTitle}</span>
                  <span className="text-gray-400">{getTimeAgo(article.createdAt)}</span>
                </div>

                <h3 className="line-clamp-2 text-sm font-semibold text-black">{article.title}</h3>
              </div>
            </Link>
          )
        })}
      </div>
    </article>
  )
}

import Link from 'next/link'
import type { UtamaItem } from '@/data/homepage/getMainHomePageData'
import Image from 'next/image'
import getTimeAgo from '@/utils/getTimeAgo'

export default function Block3x3Articles({ data }: { data: UtamaItem[] }) {
  if (!data?.length) return null

  return (
    <article>
      {/* SỬA 1: Đổi gap-2 thành gap-3 để đồng bộ với khoảng cách của khối Utama phía trên */}
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {data.map((article) => {
          const image = typeof article.Image === 'object' ? article.Image : null
          const subCategory = article.subCategory?.[0]
          const subCategoryTitle = typeof subCategory === 'object' ? subCategory?.title : 'NASIONAL'
          return (
            <Link key={article.id} href={`/berita/${article.slug || ''}`} className="group block">
              {/* SỬA 2: Xóa style inline 290px, thêm w-full để ảnh tự động chiếm hết chiều ngang của 1 cột */}
              <div className="relative aspect-video w-full overflow-hidden">
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={image.alt || article.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                )}
              </div>

              {/* SỬA 3: Đổi w-[290px] thành w-full để text cũng căn lề theo chiều ngang của cột */}
              <div className="w-full py-3">
                <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
                  <p className="font-semibold text-red-600 uppercase">{subCategoryTitle}</p>
                  <p className="text-gray-400">{getTimeAgo(article.createdAt)}</p>
                </div>

                <h3 className="line-clamp-2 text-sm font-semibold text-black hover:text-red-600">
                  {article.title}
                </h3>
              </div>
            </Link>
          )
        })}
      </div>
    </article>
  )
}

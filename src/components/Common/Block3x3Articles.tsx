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
              className="group relative block"
            >
              <div className="relative overflow-hidden" style={{ width: '290px', height: '150px' }}>
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={image.alt || article.title}
                    width={290}
                    height={150}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="w-[290px] py-3">
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

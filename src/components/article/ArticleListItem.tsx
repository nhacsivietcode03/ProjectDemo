import Image from 'next/image'
import type { Article } from '@/payload-types'
import getTimeAgo from '@/utils/getTimeAgo'

type ArticleListItemProps = {
  article: Pick<Article, 'id' | 'title' | 'Image' | 'createdAt'>
}

export default function ArticleListItem({ article }: ArticleListItemProps) {
  const image = article && typeof article.Image === 'object' ? article.Image : null

  return (
    <article className="mb-3 pb-3">
      {/* Tăng gap lên 4 cho thoáng giữa chữ và ảnh */}
      <div className="grid grid-cols-12 gap-4 border-b border-gray-300">
        <div className="col-span-9">
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <h3 className="line-clamp-3 text-base leading-[1.35] font-semibold text-black">
              {article.title}
            </h3>
            <p className="text-xs leading-none text-gray-400">{getTimeAgo(article.createdAt)}</p>
          </div>
        </div>
        <div className="col-span-3 pb-3">
          <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden bg-gray-200">
            {image?.url ? (
              <Image src={image.url} alt={image.alt} fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-[9px] text-gray-400">
                No image
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

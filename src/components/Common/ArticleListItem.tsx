import Image from 'next/image'
import type { Article } from '@/payload-types'
import getTimeAgo from '@/utils/getTimeAgo'

type ArticleListItemProps = {
  article: Pick<Article, 'id' | 'title' | 'Image' | 'createdAt'>
}

export default function ArticleListItem({ article }: ArticleListItemProps) {
  const image = article && typeof article.Image === 'object' ? article.Image : null

  return (
    <article className="flex min-h-20 gap-2 border-b border-gray-300 py-2">
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <h3 className="line-clamp-3 text-[16px] leading-[1.35] font-semibold text-black">
          {article.title}
        </h3>
        <p className="text-xs leading-none text-gray-400">{getTimeAgo(article.createdAt)}</p>
      </div>

      <div className="relative shrink-0 overflow-hidden bg-gray-200">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || article.title}
            width={100}
            height={80}
            className="object-cover"
            style={{ width: `${100}px`, height: `${80}px` }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[9px] text-gray-400">
            No image
          </div>
        )}
      </div>
    </article>
  )
}

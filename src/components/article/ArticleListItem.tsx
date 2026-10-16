import Image from 'next/image'
import type { Article } from '@/payload-types'
import { formatArticle } from '@/utils'
import Link from 'next/link'
import ArticleTime from './ArticleTime'

type ArticleListItemProps = {
  article: Pick<Article, 'id' | 'title' | 'Image' | 'createdAt'>
}

export default function ArticleListItem({ article }: ArticleListItemProps) {
  const { image, articleUrl } = formatArticle(article)
  return (
    <Link key={article.id} href={articleUrl} className="group block">
      <article className="mb-1 pb-3">
        {/* Tăng gap lên 4 cho thoáng giữa chữ và ảnh */}
        <div className="grid grid-cols-12 gap-4 border-b border-gray-300 dark:border-gray-700">
          <div className="col-span-9">
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <h3 className="line-clamp-3 min-h-14.25 text-sm leading-[1.35] font-semibold transition-colors group-hover:text-red-600 dark:text-white">
                {article.title}
              </h3>
              <ArticleTime
                date={article.createdAt}
                className="block pb-2 text-xs leading-none text-gray-400"
              />
            </div>
          </div>
          <div className="col-span-3 pb-3">
            <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden bg-gray-200 dark:bg-gray-700">
              {image?.url ? (
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[9px] text-gray-500">
                  No image
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

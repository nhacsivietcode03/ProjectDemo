import Link from 'next/link'
import type { ArticleItem } from '@/data/getMainHomePageData'
import { formatArticle } from '@/utils'

type BulletArticleListProps = {
  data: ArticleItem[]
}

export default function BulletArticleList({ data }: BulletArticleListProps) {
  if (!data?.length) return null

  return (
    <ul className="mt-5 border-t border-gray-200 dark:border-gray-700">
      {data.map((article) => {
        const { articleUrl } = formatArticle(article)
        return (
          <li
            key={article.id}
            className="flex items-center gap-5 border-b border-gray-200 px-1 py-4 dark:border-gray-700"
          >
            {/* Ô vuông đỏ - giữ nguyên tỉ lệ như ảnh mẫu */}
            <span className="mt-1 ml-2 h-2.5 w-2.5 shrink-0 bg-red-600" />
            <Link
              href={articleUrl}
              className="line-clamp-2 text-sm leading-snug font-medium text-black transition-colors hover:text-red-600 dark:text-white"
            >
              {article.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

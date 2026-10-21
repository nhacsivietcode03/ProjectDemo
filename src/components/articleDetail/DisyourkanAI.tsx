import type { Article } from '@/payload-types'
import Link from 'next/link'
import { formatArticle } from '@/utils'

type DisyourkanAIProps = {
  relatedArticles: Article[]
}

export default function DisyourkanAI({ relatedArticles }: DisyourkanAIProps) {
  const articles =
    relatedArticles?.filter((article): article is Article => typeof article !== 'string') ?? []

  if (articles.length === 0) {
    return null
  }

  return (
    <section className="mx-auto my-6 w-4/5 max-w-2xl rounded-xl bg-neutral-600 px-10 py-5 text-white">
      <div className="mb-3 inline-flex rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold">
        Disyorkan oleh AI
      </div>
      <ul className="space-y-1 text-sm">
        {articles.map((article) => (
          <li key={article.id}>
            <Link
              href={formatArticle(article).articleUrl}
              className="flex items-start gap-2 hover:text-gray-200"
            >
              <span aria-hidden="true" className="shrink-0">
                ▸
              </span>
              <span>{article.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

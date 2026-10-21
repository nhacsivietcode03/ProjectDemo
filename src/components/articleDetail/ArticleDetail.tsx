import getArticleDetail from '@/data/getArticleDetail'
import { notFound } from 'next/navigation'
import Author from './Author'
import Image from 'next/image'
import DisyourkanAI from './DisyourkanAI'

type ArticleDetailProps = {
  params: Promise<{ slug: string[] }>
}

export default async function ArticleDetail({ params }: ArticleDetailProps) {
  const { slug } = await params
  const articleId = slug.at(-2)
  if (!articleId) {
    notFound()
  }
  const article = await getArticleDetail(articleId)
  const articleImage = article && typeof article.Image === 'object' ? article.Image : null
  return (
    <div>
      <div className="text-3xl font-semibold dark:text-white">{article.title}</div>
      {typeof article.author === 'object' && (
        <Author authorData={article.author} articleDate={article.createdAt} />
      )}
      {article.excerpt && (
        <p className="my-5 rounded-md border-l-3 border-gray-700 bg-gray-100 px-3 py-2 text-base leading-snug text-gray-800 italic dark:bg-gray-700 dark:text-gray-100">
          {article.excerpt}
        </p>
      )}
      <div className="relative my-5 aspect-video w-full overflow-hidden">
        {articleImage?.url && (
          <Image src={articleImage.url} alt={articleImage.alt} fill className="object-cover" />
        )}
      </div>
      <DisyourkanAI relatedArticles={article.relatedArticles} />
    </div>
  )
}

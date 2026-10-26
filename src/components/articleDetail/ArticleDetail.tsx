import getArticleDetail from '@/data/getArticleDetail'
import { notFound } from 'next/navigation'
import Author from './Author'
import Image from 'next/image'
import DisyourkanAI from './DisyourkanAI'
import DisyourkanCarousel from './DisyourkanCarousel'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { AdSlot } from '@/components/common'
import { getMainHomePageData } from '@/data'

type ArticleDetailProps = {
  params: Promise<{ slug: string[] }>
}

export default async function ArticleDetail({ params }: ArticleDetailProps) {
  const { slug } = await params
  const articleId = slug.at(-2)
  if (!articleId) {
    notFound()
  }
  const [{ disyorkanData }, article] = await Promise.all([
    getMainHomePageData(),
    getArticleDetail(articleId),
  ])

  if (!article) {
    return (
      <div className="flex min-h-30 items-center justify-center">
        <h1 className="text-2xl font-bold dark:text-white">Không tìm thấy bài viết</h1>
      </div>
    )
  }

  const articleImage = article && typeof article.Image === 'object' ? article.Image : null
  return (
    <div>
      {/* Article Title */}
      <div className="text-3xl font-semibold dark:text-white">{article.title}</div>

      {/* Article Author */}
      {typeof article.author === 'object' && (
        <Author authorData={article.author} articleDate={article.createdAt} />
      )}

      {/* Article excerpt */}
      {article.excerpt && (
        <p className="my-5 rounded-md border-l-3 border-gray-700 bg-gray-100 px-3 py-2 text-base leading-snug text-gray-800 italic dark:bg-gray-700 dark:text-gray-100">
          {article.excerpt}
        </p>
      )}

      {/* Article Image */}
      <div className="relative my-5 aspect-video w-full overflow-hidden">
        {articleImage?.url && (
          <Image src={articleImage.url} alt={articleImage.alt} fill className="object-cover" />
        )}
      </div>

      {/* Disyourkan */}
      <DisyourkanAI relatedArticles={article.relatedArticles} />

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none dark:text-white">
        <RichText
          data={article.content}
          converters={({ defaultConverters }) => ({
            ...defaultConverters,
            blocks: {
              disyorkan_block: () => <DisyourkanCarousel data={disyorkanData} />,
              ad_block: ({ node }: { node: any }) => {
                const size = node.fields.adSize
                const [width, height] = size.split('x').map(Number)
                const displayClass = size === '400x200' ? 'hidden lg:flex' : 'flex lg:hidden'
                return (
                  <div className={`my-5 w-full justify-center ${displayClass}`}>
                    <AdSlot slot={size} width={width} height={height} />
                  </div>
                )
              },
            },
          })}
        />
      </div>
    </div>
  )
}

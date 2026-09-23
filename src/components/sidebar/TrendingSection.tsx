import HeaderTitle from '../common/HeaderSection'
import getTrending from '@/data/sidebar/getTrending'
import getTimeAgo from '@/utils/getTimeAgo'

export default async function TrendingSection() {
  const trendingArticles = await getTrending()

  return (
    <section className="pb-5">
      <HeaderTitle title="Trending" />

      <div className="mt-2">
        {trendingArticles.map((article, index) => (
          <article
            key={article.id}
            className="flex min-h-20 items-center gap-3 border-b border-gray-200 py-2"
          >
            <p className="w-10 shrink-0 px-2 text-5xl leading-none font-bold text-black">
              {index + 1}
            </p>

            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-sm leading-[1.35] font-semibold text-black">
                {article.title}
              </h3>
              <p className="mt-1 py-2 text-xs leading-none text-gray-400">
                {getTimeAgo(article.createdAt)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

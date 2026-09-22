import getTerkini from '@/data/sidebar/getTerkini'
import ArticleListItem from '@/components/common/ArticleListItem'
import HeaderTitle from '../common/HeaderSection'

export default async function Terkini() {
  const articlesList = await getTerkini()
  if (!articlesList) return
  return (
    <section className="pb-5">
      <HeaderTitle title="Terkini" />

      <div className="mt-2">
        {articlesList.map((article, index) => (
          <div key={article.id} className="relative">
            <ArticleListItem article={article} />
            <span className="pointer-events-none absolute right-17 bottom-4 text-4xl leading-5 font-bold text-white drop-shadow-[2px_2px_2px_rgba(0,0,0,0.9)]">
              {index + 1}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

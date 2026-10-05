import HeaderTitle from '../common/HeaderTitle'
import type { TrendingItem } from '@/data/getSideBarData'
import formatArticle from '@/utils/formatArticles'
import getTimeAgo from '@/utils/getTimeAgo'
import Image from 'next/image'
import Link from 'next/link'

type TrendingProps = {
  trendingData: TrendingItem[]
}

export default function TrendingSection({ trendingData }: TrendingProps) {
  return (
    <section>
      <HeaderTitle title="Trending" />

      <div className="mt-2">
        {trendingData.map((article) => {
          const { image, articleUrl } = formatArticle(article)

          return (
            <article
              key={article.id}
              className="mb-3 min-h-20 items-center gap-3 border-b border-gray-200 pb-4"
            >
              <Link key={article.id} href={articleUrl} className="group block">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-3">
                    <div className="relative aspect-4/3 shrink-0 overflow-hidden bg-gray-200">
                      {image?.url ? (
                        <Image
                          src={image.url}
                          alt={image.alt || article.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[9px] text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-9">
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm leading-[1.35] font-semibold text-black group-hover:text-red-600">
                        {article.title}
                      </h3>
                      <p className="mt-1 py-2 text-xs leading-none text-gray-400">
                        {getTimeAgo(article.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}

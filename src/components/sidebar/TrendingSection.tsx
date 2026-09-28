import HeaderTitle from '../common/HeaderSection'
import type { TrendingItem } from '@/data/sidebar/getSideBarData'
import getTimeAgo from '@/utils/getTimeAgo'
import Image from 'next/image'

type TrendingProps = {
  trendingData: TrendingItem[]
}

export default function TrendingSection({ trendingData }: TrendingProps) {
  return (
    <section className="pb-5">
      <HeaderTitle title="Trending" />

      <div className="mt-2">
        {trendingData.map((article) => {
          const image = article && typeof article.Image === 'object' ? article.Image : null
          return (
            <article
              key={article.id}
              className="flex min-h-20 items-center gap-3 border-b border-gray-200 py-2"
            >
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

              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm leading-[1.35] font-semibold text-black">
                  {article.title}
                </h3>
                <p className="mt-1 py-2 text-xs leading-none text-gray-400">
                  {getTimeAgo(article.createdAt)}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

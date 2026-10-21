'use client'

import type { ArticleItem } from '@/data/getMainHomePageData'
import ArticleListItem from '@/components/article/ArticleListItem'
import { useRef } from 'react'
import { MdChevronRight } from 'react-icons/md'

type DisyourkanCarouselProps = {
  data: ArticleItem[]
}

export default function DisyourkanCarousel({ data }: DisyourkanCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (!data.length) {
    return null
  }

  const scrollNext = () => {
    const carousel = scrollRef.current
    if (!carousel) return

    const scrollStep = carousel.clientWidth / 2
    const remainingScroll = carousel.scrollWidth - carousel.clientWidth - carousel.scrollLeft

    if (remainingScroll <= scrollStep + 1) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }

    carousel.scrollBy({ left: scrollStep, behavior: 'smooth' })
  }

  return (
    <section className="my-5 overflow-hidden rounded-md bg-gray-100 px-5 py-6 dark:bg-gray-800">
      <h2 className="mb-4 text-2xl font-semibold text-black dark:text-white">DISYORKAN</h2>
      <div className="relative">
        <div className="pr-10">
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {data.map((article) => (
              <div
                key={article.id}
                className="w-[calc(100%-2rem)] shrink-0 snap-start sm:w-[calc(50%-0.625rem)]"
              >
                <ArticleListItem article={article} />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Xem bài viết được đề xuất tiếp theo"
          className="absolute top-1/2 right-0 z-10 flex h-6 w-6 -translate-y-5/6 items-center justify-center border border-pink-600 bg-white text-pink-600 transition-colors hover:bg-pink-600 hover:text-white"
        >
          <MdChevronRight size={24} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}

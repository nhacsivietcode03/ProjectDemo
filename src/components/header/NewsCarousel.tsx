'use client'

import React, { useState, useEffect } from 'react'
import type { Header } from '@/payload-types'
import Image from 'next/image'

type Carousels = NonNullable<Header['caroselItems']>
type CarouselProps = {
  carousel: Carousels
}

const getLastValidIndex = (itemCount: number, itemsPerView: number) => {
  const trackCopyCount = itemCount <= itemsPerView ? 3 : 2
  return Math.max(0, Math.ceil(itemCount * trackCopyCount - itemsPerView))
}

export default function NewsCarousel({ carousel }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)
  const [isHovered, setIsHovered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      // Màn hình nhỏ hiện hé một phần tin kế tiếp để gợi ý rằng danh sách có thể trượt.
      const newItemsPerView = width < 1024 ? 1.2 : 4

      setItemsPerView(newItemsPerView)
      // Giữ vị trí hiện tại trong giới hạn hợp lệ khi kích thước màn hình thay đổi.
      setCurrentIndex((previousIndex) =>
        Math.min(previousIndex, getLastValidIndex(carousel.length, newItemsPerView)),
      )
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [carousel.length])

  if (!carousel || carousel.length === 0) return null

  // Lặp danh sách để có khoảng đệm trước khi carousel nhảy tức thì về đầu.
  const trackCopyCount = carousel.length <= itemsPerView ? 3 : 2
  const displayItems = Array.from({ length: trackCopyCount }, () => carousel).flat()
  const lastValidIndex = getLastValidIndex(carousel.length, itemsPerView)

  const handleNext = () => {
    // Một tin duy nhất không có vị trí kế tiếp để chuyển đến.
    if (carousel.length < 2) return

    if (currentIndex >= lastValidIndex) {
      // Tắt animation khi nhảy về bản sao đầu tiên, rồi bật lại để trượt sang tin kế.
      setIsTransitioning(false)
      setCurrentIndex(0)

      setTimeout(() => {
        setIsTransitioning(true)
        setCurrentIndex(1)
      }, 50)
    } else {
      setIsTransitioning(true)
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (carousel.length < 2) return

    if (currentIndex <= 0) {
      // Nhảy không animation về cuối danh sách lặp, rồi bật animation để trượt lùi.
      setIsTransitioning(false)
      setCurrentIndex(lastValidIndex)

      setTimeout(() => {
        setIsTransitioning(true)
        setCurrentIndex(lastValidIndex - 1)
      }, 50)
    } else {
      setIsTransitioning(true)
      setCurrentIndex((prev) => prev - 1)
    }
  }

  useEffect(() => {
    if (isHovered || carousel.length < 2) return

    const timer = setInterval(() => {
      handleNext()
    }, 4000)
    return () => clearInterval(timer)
  }, [carousel.length, isHovered, lastValidIndex, currentIndex])

  return (
    <div
      className="relative w-full border-y border-gray-200 bg-[#f5f5f5] py-2 shadow-xs dark:border-gray-700 dark:bg-[#444444] dark:text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative container mx-auto overflow-hidden px-1">
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-18 w-10 bg-gradient-to-r from-[#f5f5f5] via-[#f5f5f5]/95 to-transparent sm:w-18 dark:from-[#444444] dark:via-[#444444]/95" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-18 w-10 bg-gradient-to-l from-[#f5f5f5] via-[#f5f5f5]/95 to-transparent sm:w-18 dark:from-[#444444] dark:via-[#444444]/95" />

        <button
          onClick={handlePrev}
          type="button"
          className="absolute top-1/2 left-1 z-20 flex h-6.5 w-6.5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[2px] border border-[#d81b60] bg-white text-xs font-bold text-[#d81b60] shadow-xs transition-colors hover:bg-[#d81b60] hover:text-white sm:left-0.5"
          aria-label="Previous slide"
        >
          &lt;
        </button>

        <div className="w-full overflow-hidden px-5 sm:px-0">
          <div
            // Tắt transition trong lúc nhảy vòng để người xem không thấy cú nhảy.
            className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {displayItems.map((item, index) => {
              const imageMedia = item && typeof item.image === 'object' ? item.image : null
              const imageUrl =
                imageMedia && typeof imageMedia.url === 'string' ? imageMedia.url : null
              return (
                <div
                  key={`${item.id}-${index}`}
                  style={{ width: `${100 / itemsPerView}%` }}
                  className="shrink-0 px-1 sm:px-2.5"
                >
                  <div className="group flex h-full cursor-pointer items-start gap-3 border-r border-gray-300 pr-2 sm:pr-3">
                    <div className="relative ml-2 h-17 w-26 shrink-0 rounded-md bg-gray-200 sm:h-16 sm:w-24">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.title || 'news image'}
                          fill
                          className="rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-xs font-semibold text-[#d81b60]">{item.title}</p>
                      <p className="line-clamp-2 text-xs leading-snug font-normal text-gray-900 transition-colors group-hover:text-[#d81b60] dark:text-white">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <button
          onClick={handleNext}
          type="button"
          className="absolute top-1/2 right-1 z-20 flex h-6.5 w-6.5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[2px] border border-[#d81b60] bg-white text-xs font-bold text-[#d81b60] shadow-xs transition-colors hover:bg-[#d81b60] hover:text-white sm:right-0.5"
          aria-label="Next slide"
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

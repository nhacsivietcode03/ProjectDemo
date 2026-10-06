'use client'

import React, { useState, useEffect } from 'react'
import type { Header } from '@/payload-types'
import Image from 'next/image'

type Carousels = NonNullable<Header['caroselItems']>
type CarouselProps = {
  carousel: Carousels
}

export default function NewsCarousel({ carousel }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)
  const [isHovered, setIsHovered] = useState(false)

  // THÊM MỚI 1: Trạng thái quản lý việc bật/tắt animation
  const [isTransitioning, setIsTransitioning] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      let newItemsPerView = 4

      if (width < 1024) {
        newItemsPerView = 1.2
      } else {
        newItemsPerView = 4
      }

      setItemsPerView(newItemsPerView)

      setCurrentIndex((prev) =>
        Math.min(prev, Math.max(0, Math.ceil(carousel.length * 2 - newItemsPerView))),
      )
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [carousel.length])

  if (!carousel || carousel.length === 0) return null

  const displayItems =
    carousel.length <= itemsPerView
      ? [...carousel, ...carousel, ...carousel, ...carousel]
      : [...carousel, ...carousel]

  // Dùng Math.ceil để làm tròn lên, tránh lỗi index số thập phân khi dùng 1.2
  const maxIndex = Math.ceil(displayItems.length - itemsPerView)

  // THÊM MỚI 2: Sửa lại logic Next để dịch chuyển tức thời (không animation) khi chạm đáy
  const handleNext = () => {
    if (currentIndex >= maxIndex) {
      // 1. Tắt animation
      setIsTransitioning(false)
      // 2. Nhảy cóc về vị trí 0 ngay lập tức
      setCurrentIndex(0)

      // 3. Đợi 50ms để DOM cập nhật trạng thái không animation, sau đó bật lại và tiến lên slide 1
      setTimeout(() => {
        setIsTransitioning(true)
        setCurrentIndex(1)
      }, 50)
    } else {
      setIsTransitioning(true)
      setCurrentIndex((prev) => prev + 1)
    }
  }

  // THÊM MỚI 3: Sửa lại logic Prev tương tự
  const handlePrev = () => {
    if (currentIndex <= 0) {
      setIsTransitioning(false)
      setCurrentIndex(maxIndex)

      setTimeout(() => {
        setIsTransitioning(true)
        setCurrentIndex(maxIndex - 1)
      }, 50)
    } else {
      setIsTransitioning(true)
      setCurrentIndex((prev) => prev - 1)
    }
  }

  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      handleNext()
    }, 4000)
    return () => clearInterval(timer)
  }, [isHovered, maxIndex, currentIndex]) // Cập nhật dependency

  return (
    <div
      className="relative w-full border-y border-gray-200 bg-[#f5f5f5] py-2 shadow-xs"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative container mx-auto overflow-hidden px-1">
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-18 w-10 bg-gradient-to-r from-[#f5f5f5] via-[#f5f5f5]/95 to-transparent sm:w-18" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-18 w-10 bg-gradient-to-l from-[#f5f5f5] via-[#f5f5f5]/95 to-transparent sm:w-18" />

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
            // THÊM MỚI 4: Chỉ áp dụng class transition khi biến isTransitioning = true
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
                      <p className="line-clamp-2 text-xs leading-snug font-normal text-gray-900 transition-colors group-hover:text-[#d81b60]">
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

'use client'

import React, { useState, useEffect, useRef } from 'react'
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

  if (!carousel || carousel.length === 0) return null

  const displayItems =
    carousel.length <= itemsPerView
      ? [...carousel, ...carousel, ...carousel, ...carousel]
      : [...carousel, ...carousel]

  const maxIndex = displayItems.length - itemsPerView

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev >= 0 ? prev - 1 : maxIndex))
  }

  // Tự động chạy carousel sau mỗi 4 giây (tạm dừn  g khi hover chuột vào)
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      handleNext()
    }, 4000)
    return () => clearInterval(timer)
  }, [isHovered, maxIndex])

  return (
    <div
      className="relative mt-2 w-full border-y border-gray-200 bg-[#f5f5f5] py-2 shadow-xs"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative container mx-auto overflow-hidden px-1">
        {/* Lớp phủ gradient mờ 2 đầu tạo hiệu ứng tràn tin tức */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-18 w-18 bg-gradient-to-r from-[#f5f5f5] via-[#f5f5f5]/95 to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-18 w-18 bg-gradient-to-l from-[#f5f5f5] via-[#f5f5f5]/95 to-transparent" />

        {/* Nút Previous - Nổi đè lên trên ở mép trái */}
        <button
          onClick={handlePrev}
          type="button"
          className="absolute top-1/2 left-0.5 z-20 flex h-6.5 w-6.5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[2px] border border-[#d81b60] bg-white text-xs font-bold text-[#d81b60] shadow-xs transition-colors hover:bg-[#d81b60] hover:text-white"
          aria-label="Previous slide"
        >
          &lt;
        </button>

        {/* Khung chứa các slide tin tức */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
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
                  className="shrink-0 px-2 sm:px-2.5"
                >
                  <div className="group flex h-full cursor-pointer items-start gap-3 border-r border-gray-300 pr-2 sm:pr-3">
                    {/* Ảnh thumbnail bo góc to hơn */}
                    <div className="relative h-17 w-22 shrink-0 rounded-md bg-gray-200 sm:h-16 sm:w-24">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.title || 'news image'}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Tiêu đề & Nội dung */}
                    <div>
                      <p className="text-xs font-semibold text-[#d81b60]">{item.title}</p>
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

        {/* Nút Next - Nổi đè lên trên ở mép phải */}
        <button
          onClick={handleNext}
          type="button"
          className="absolute top-1/2 right-0.5 z-20 flex h-6.5 w-6.5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[2px] border border-[#d81b60] bg-white text-xs font-bold text-[#d81b60] shadow-xs transition-colors hover:bg-[#d81b60] hover:text-white"
          aria-label="Next slide"
        >
          &gt;
        </button>
      </div>
    </div>
  )
}

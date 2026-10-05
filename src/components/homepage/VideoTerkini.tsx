'use client'

import { useRef, useEffect } from 'react'
import type { VideoShortItem } from '@/data/getMainHomePageData'
import { HeaderTitle } from '../common'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { ShortVideo } from '../Video'

type VideoTerkiniProps = {
  videoTerkiniData: VideoShortItem[]
}

export default function VideoTerkini({ videoTerkiniData }: VideoTerkiniProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Nhân bản mảng 3 lần để có đủ nội dung cuộn sang 2 bên
  const extendedVideos = [...videoTerkiniData, ...videoTerkiniData, ...videoTerkiniData]

  // Thiết lập vị trí cuộn ban đầu nằm ở đoạn giữa
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3
    }
  }, [videoTerkiniData])

  // Xử lý logic vòng lặp vô tận khi cuộn chạm viền
  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return

    const oneThirdWidth = container.scrollWidth / 3

    if (container.scrollLeft <= 5) {
      container.scrollLeft += oneThirdWidth
    } else if (container.scrollLeft >= oneThirdWidth * 2 - 5) {
      container.scrollLeft -= oneThirdWidth
    }
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  if (!videoTerkiniData?.length) return null

  return (
    <section>
      <HeaderTitle title="Video Terkini" label="Video" />
      <div className="relative mt-5">
        {/* Nút lùi */}
        <button
          type="button"
          onClick={scrollLeft}
          aria-label="Video trước"
          className="absolute top-1/2 -left-5 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50 focus:outline-none"
        >
          <MdChevronLeft size={24} className="text-red-600" />
        </button>

        {/* Container cuộn */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {extendedVideos.map((video, idx) => (
            <ShortVideo key={`${video.id}-${idx}`} video={video} />
          ))}
        </div>

        {/* Nút tiến */}
        <button
          type="button"
          onClick={scrollRight}
          aria-label="Video tiếp theo"
          className="absolute top-1/2 -right-5 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50 focus:outline-none"
        >
          <MdChevronRight size={24} className="text-red-600" />
        </button>
      </div>
    </section>
  )
}

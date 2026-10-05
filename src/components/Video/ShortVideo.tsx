'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { VideoShortItem } from '@/data/getMainHomePageData'
import getThumnailYoutube from '@/utils/getThumnailYoutube'

const getYoutubeIframeUrl = (youtubeId: string) =>
  `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${youtubeId}`

type ShortVideoProps = {
  video: VideoShortItem
}

export default function ShortVideo({ video }: ShortVideoProps) {
  const thumbnailUrl = getThumnailYoutube(video.youtubeId)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative block aspect-9/16 w-105 shrink-0 snap-start overflow-hidden rounded-md bg-gray-900 lg:w-54"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Layer */}
      {!isHovered ? (
        <Image
          src={thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <iframe
          src={getYoutubeIframeUrl(video.youtubeId)}
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      )}

      {/* Gradient Overlay & Content - Ẩn khi hover */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/60 to-transparent px-3 pt-20 pb-5 transition-opacity duration-200 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Title */}
        <h3 className="line-clamp-3 text-base leading-snug font-semibold text-white">
          {video.title}
        </h3>

        {/* Play icon & Duration - Khoảng cách (mt-2) để thoáng hơn */}
        <div className="mt-2 flex items-center gap-1.5">
          {/* Icon to hơn (h-4 w-4) */}
          <svg className="h-7 w-7 fill-current text-white" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          {/* Chữ to hơn (text-xs) */}
          <span className="text-xs font-medium tracking-wide text-white">
            {video.duration || '0:00'}
          </span>
        </div>
      </div>

      {/* Clickable Link Overlay */}
      <Link href={video.youtubeUrl} target="_blank" className="absolute inset-0 z-20" />
    </div>
  )
}

'use client'
import { useState } from 'react'
import { YouTubeEmbed } from '@next/third-parties/google'
import Image from 'next/image'
import Link from 'next/link'
import type { VideoShortItem } from '@/data/getMainHomePageData'
import { getThumnailYoutube } from '@/utils'

type ShortVideoProps = {
  video: VideoShortItem
}

export default function ShortVideo({ video }: ShortVideoProps) {
  const thumbnailUrl = getThumnailYoutube(video.youtubeId)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative block aspect-9/16 w-70 shrink-0 snap-start overflow-hidden rounded-md bg-gray-900 lg:w-54"
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
        <div className="absolute inset-0 [&>div]:h-full! [&>div]:w-full!">
          <YouTubeEmbed
            videoid={video.youtubeId}
            playlabel={`Play ${video.title}`}
            params={`autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${video.youtubeId}`}
            style="width: 100%; height: 100%;"
          />
        </div>
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

      <Link
        href={video.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-2 right-2 z-20 rounded bg-black/70 px-2 py-1 text-xs text-white"
        prefetch={false}
      >
        Mở YouTube
      </Link>
    </div>
  )
}

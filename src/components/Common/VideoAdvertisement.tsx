'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { CloseButton } from '.'

type VideoAdvertisementProps = {
  youtubeId: string
}

export default function VideoAdvertisement({ youtubeId }: VideoAdvertisementProps) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)

  // Chỉ hiển thị trên homepage
  if (pathname !== '/' || !isVisible) return null

  return (
    <div className="fixed top-58 right-25 z-50 w-50 shadow-2xl">
      <div className="absolute -top-4 -right-4 z-10">
        <CloseButton onClick={() => setIsVisible(false)} />
      </div>
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <iframe
          title="Video advertisement"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=1&modestbranding=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  )
}

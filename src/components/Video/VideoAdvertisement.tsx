'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { YouTubeEmbed } from '@next/third-parties/google'
import { CloseButton } from '../common'

type VideoAdvertisementProps = {
  youtubeId: string
}

export default function VideoAdvertisement({ youtubeId }: VideoAdvertisementProps) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)

  // Chỉ hiển thị trên homepage
  if (pathname !== '/' || !isVisible) return null
  return (
    <div className="fixed top-55 right-15 z-50 w-50">
      <div className="absolute -top-4 -right-4 z-10">
        <CloseButton onClick={() => setIsVisible(false)} />
      </div>
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <YouTubeEmbed
          videoid={youtubeId}
          playlabel="Play video advertisement"
          params={`autoplay=0&mute=1&controls=0&modestbranding=1&loop=1&playlist=${youtubeId}`}
        />
      </div>
    </div>
  )
}

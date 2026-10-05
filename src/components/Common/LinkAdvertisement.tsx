'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { SiteSetting } from '@/payload-types'
import CloseButton from './CloseButton'

type LinkAdvertisementProps = {
  advertisement: NonNullable<SiteSetting['linkAdvertisement']>
}

export default function LinkAdvertisement({ advertisement }: LinkAdvertisementProps) {
  const [isVisible, setIsVisible] = useState(true)
  const image =
    advertisement.image && typeof advertisement.image === 'object' ? advertisement.image : null

  if (!isVisible || !advertisement.link || !image?.url) return null

  return (
    <div className="fixed top-98 right-15 z-40">
      <div className="relative w-fit max-w-[calc(100vw-2rem)]">
        <div className="absolute -top-3 -right-3 z-50">
          <CloseButton onClick={() => setIsVisible(false)} />
        </div>
        <a
          href={advertisement.link}
          target="_blank"
          aria-label={image.alt || 'Mở quảng cáo'}
          className="inline-block max-w-full"
        >
          <Image
            src={image.url}
            alt={image.alt || ''}
            width={image.width || 300}
            height={image.height || 250}
            className="block h-auto w-auto max-w-full"
          />
        </a>
      </div>
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import type { VideoItem } from '@/data/getMainHomePageData'
import getTimeAgo from '@/utils/getTimeAgo'

type VideoThumbnailProps = {
  video: VideoItem
}

export default function VideoThumbnail({ video }: VideoThumbnailProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`
  const videoCategory = video.category && video.category.length > 0 ? video.category[0] : 'Kes'

  return (
    <Link
      href={video.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block gap-2"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="w-full py-3">
        <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
          <p className="font-semibold text-red-600 uppercase">{videoCategory}</p>
          <p className="text-gray-400">{getTimeAgo(video.createdAt)}</p>
        </div>

        <h3 className="line-clamp-2 min-h-10.5 text-sm font-semibold text-black transition-colors group-hover:text-red-600">
          {video.title}
        </h3>
      </div>
    </Link>
  )
}

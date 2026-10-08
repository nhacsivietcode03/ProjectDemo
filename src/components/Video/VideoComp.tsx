import type { VideoItem } from '@/data/getMainHomePageData'
import { getYoutubeUrl } from '@/utils'

type VideoProp = {
  video: Pick<VideoItem, 'title' | 'youtubeId'>
  type?: 'podCast' | 'default'
}

export default async function VideoComp({ video, type = 'default' }: VideoProp) {
  const youtubeUrl = getYoutubeUrl(video.youtubeId)
  return (
    <div className="group w-full">
      <iframe
        className="aspect-video w-full"
        src={youtubeUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      ></iframe>
      <h2
        className={`mt-3 line-clamp-2 leading-snug font-semibold text-black transition-colors group-hover:text-red-600 dark:text-white ${
          type === 'podCast' ? 'text-base sm:text-lg' : 'text-lg sm:text-2xl'
        }`}
      >
        {video.title}
      </h2>
    </div>
  )
}

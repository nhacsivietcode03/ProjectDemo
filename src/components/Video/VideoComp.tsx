import { YouTubeEmbed } from '@next/third-parties/google'
import type { VideoItem } from '@/data/getMainHomePageData'

type VideoProp = {
  video: Pick<VideoItem, 'title' | 'youtubeId'>
  type?: 'podCast' | 'default'
}

export default async function VideoComp({ video, type = 'default' }: VideoProp) {
  return (
    <div className="group w-full">
      <div className="aspect-video w-full overflow-hidden">
        <YouTubeEmbed
          videoid={video.youtubeId}
          playlabel={video.title}
          params={`autoplay=0&mute=1&controls=0&modestbranding=1&loop=1&playlist=${video.youtubeId}`}
        />
      </div>
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

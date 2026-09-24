type VideoProp = {
  video: {
    title: string
    youtubeId: string
  }
}

export default async function Video({ video }: VideoProp) {
  return (
    <div className="mt-5 w-full">
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube.com/embed/${video.youtubeId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <p className="py-1 text-xl font-semibold">{video.title}</p>
    </div>
  )
}

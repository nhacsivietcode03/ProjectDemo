export default function getYoutubeUrl(youtubeId: string) {
  return `https://www.youtube.com/embed/${youtubeId}?autoplay=0&mute=1&controls=0&modestbranding=1&loop=1&playlist=${youtubeId}`
}

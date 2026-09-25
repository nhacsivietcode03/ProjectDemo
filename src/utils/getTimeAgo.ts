export default function getTimeAgo(createdAt: string) {
  const minutesPassed = Math.max(
    0,
    Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000),
  )

  if (minutesPassed < 1) return 'Just now'
  if (minutesPassed < 60) return `${minutesPassed} minutes ago`

  const hoursPassed = Math.floor(minutesPassed / 60)
  if (hoursPassed < 24) return `${hoursPassed} hours ago`

  return `${Math.floor(hoursPassed / 24)} days ago`
}

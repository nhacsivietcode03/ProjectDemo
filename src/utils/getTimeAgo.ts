export default function getTimeAgo(createdAt: string) {
  const createdDate = new Date(createdAt)
  const minutesPassed = Math.max(0, Math.floor((Date.now() - createdDate.getTime()) / 60000))

  if (minutesPassed < 1) return 'Just now'
  if (minutesPassed < 60) return `${minutesPassed} minutes ago`

  const hoursPassed = Math.floor(minutesPassed / 60)
  if (hoursPassed < 24) return `${hoursPassed} hours ago`

  const dateParts = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).formatToParts(createdDate)
  const timeParts = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(createdDate)
  const getPart = (parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ''

  const month = getPart(dateParts, 'month')
  const day = getPart(dateParts, 'day')
  const year = getPart(dateParts, 'year')
  const hour = getPart(timeParts, 'hour')
  const minute = getPart(timeParts, 'minute')
  const dayPeriod = getPart(timeParts, 'dayPeriod').toLowerCase()

  return `${month} ${day}, ${year} @ ${hour}:${minute}${dayPeriod}`
}

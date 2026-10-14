'use client'

export default function MalaysiaTime() {
  return (
    <p className="p-2 text-right text-sm">
      {new Intl.DateTimeFormat('ms-MY', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kuala_Lumpur',
      })
        .format(new Date())
        .replace(' pada ', ', ')
        .replace(' PG', ' am')
        .replace(' PTG', ' pm')}
    </p>
  )
}

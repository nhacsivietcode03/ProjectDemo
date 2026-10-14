'use client'

import { useEffect, useState } from 'react'
import { getTimeAgo } from '@/utils'

type ArticleTimeProps = {
  date: string
  className?: string
}

export default function ArticleTime({ date, className }: ArticleTimeProps) {
  const [timeAgo, setTimeAgo] = useState('...')

  useEffect(() => {
    setTimeAgo(getTimeAgo(date))
  }, [date])

  return (
    <time dateTime={date} className={className}>
      {timeAgo}
    </time>
  )
}

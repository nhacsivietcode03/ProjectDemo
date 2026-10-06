import { getTimeAgo } from '@/utils'

type ArticleTimeProps = {
  date: string
  className?: string
}

export default function ArticleTime({ date, className }: ArticleTimeProps) {
  return (
    <time dateTime={date} className={className}>
      {getTimeAgo(date)}
    </time>
  )
}

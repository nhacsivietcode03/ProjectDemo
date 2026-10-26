'use client'

import type { Tag } from '@/payload-types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type TrendingProps = {
  trendingData: Tag[]
}

export default function Trending({ trendingData }: TrendingProps) {
  const pathname = usePathname()

  if (pathname !== '/' || trendingData.length === 0) {
    return null
  }

  return (
    <div className="mt-2 flex w-full min-w-0 items-center gap-2 overflow-hidden pl-3 text-sm whitespace-nowrap sm:gap-3">
      <div className="shrink-0 font-bold text-red-600">Trending :</div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <ul className="flex w-max gap-4 whitespace-nowrap dark:text-white">
          {trendingData.map((tag) => (
            <li key={tag.id}>
              <Link href={`/${tag.slug}`} className="hover:text-red-600">
                {tag.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

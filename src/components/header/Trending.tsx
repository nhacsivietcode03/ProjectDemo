'use client'

import { usePathname } from 'next/navigation'

export default function Trending() {
  const pathname = usePathname()

  if (pathname !== '/') {
    return null
  }

  // Nếu là trang chủ, hiển thị phần tử này
  return (
    <div className="mt-2 ml-2 flex w-full min-w-0 items-center gap-2 overflow-hidden text-sm whitespace-nowrap sm:gap-3">
      <div className="shrink-0 font-bold text-red-600">Trending :</div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <ul className="flex w-max gap-4 whitespace-nowrap dark:text-white">
          <li>Account</li>
          <li>IMDB Scandal</li>
          <li>Election 2024</li>
          <li>Foods</li>
          <li>New year 2025</li>
        </ul>
      </div>
    </div>
  )
}

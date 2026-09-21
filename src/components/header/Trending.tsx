'use client'

import { usePathname } from 'next/navigation'

export default function Trending() {
  const pathname = usePathname()

  // Kiểm tra xem có phải trang chủ không (đường dẫn là "/")
  const isHomepage = pathname === '/'

  // Nếu không phải trang chủ, không render gì cả (trả về null)
  if (!isHomepage) {
    return null
  }

  // Nếu là trang chủ, hiển thị phần tử này
  return (
    <div className="mt-2 ml-2 flex items-center gap-4 text-xs">
      <div className="font-bold text-red-600">Trending :</div>
      <div>
        <ul className="flex gap-4">
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

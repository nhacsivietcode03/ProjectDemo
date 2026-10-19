'use client'

import Link from 'next/link'
import { Category, Nav } from '@/payload-types'
import { usePathname } from 'next/navigation'

type NavigationBarProps = {
  category: Category[]
  navBar: Nav
}

export default function NavigationBar({ category, navBar }: NavigationBarProps) {
  const path = usePathname()

  const checkActive = (href: string) => {
    if (href === '/' || href === '#') return path === href
    return path === href || path.startsWith(`${href}/`)
  }

  return (
    <nav className="flex w-220 items-center justify-between font-semibold dark:text-white">
      {/* 1. Render Category Links */}
      {category.map((item) => {
        const href = `/${item.slug}`
        const isActive = checkActive(href)

        return (
          <Link
            // Nối thêm class 'text-red-600' nếu isActive là true
            className={`transition hover:text-red-600 ${isActive ? 'text-red-600' : ''}`}
            href={href}
            key={item.id}
          >
            {item.title}
          </Link>
        )
      })}

      {/* 2. Render NavBar Items từ thiết lập chung */}
      {navBar.items?.map((item, index) => {
        const key = `${item.type}-${item.label || index}`

        // Nhớ xử lý dấu '/' ở đầu để tránh lỗi nối URL tương đối ở trang con
        let rawUrl = item.url || '#'
        if (item.type !== 'external' && rawUrl !== '#' && !rawUrl.startsWith('/')) {
          rawUrl = `/${rawUrl}`
        }

        const href =
          item.type === 'tag' ? `/tag/${item.tag?.replace(' ', '-').toLowerCase()}` : rawUrl

        const isActive = checkActive(href)

        return item.type === 'external' ? (
          <a
            className="transition hover:text-red-600"
            href={href}
            key={key}
            rel="noreferrer"
            target="_blank"
          >
            {item.label}
          </a>
        ) : (
          <Link
            className={`transition hover:text-red-600 ${isActive ? 'text-red-600' : ''}`}
            href={href}
            key={key}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

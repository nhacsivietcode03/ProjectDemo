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

      {navBar.tags?.map((tag) => {
        if (typeof tag === 'string') return null

        const href = `/${tag.slug}`
        const isActive = checkActive(href)

        return (
          <Link
            className={`transition hover:text-red-600 ${isActive ? 'text-red-600' : ''}`}
            href={href}
            key={tag.id}
          >
            #{tag.title}
          </Link>
        )
      })}

      {navBar.externalLinks?.map((link, index) => (
        <a
          className="transition hover:text-red-600"
          href={link.url}
          key={link.id ?? `${link.url}-${index}`}
          rel="noreferrer"
          target="_blank"
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}

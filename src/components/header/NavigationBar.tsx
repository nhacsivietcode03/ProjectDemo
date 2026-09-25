import Link from 'next/link'
import { Category, Nav } from '@/payload-types'

type NavigationBarProps = {
  category: Category[]
  navBar: Nav
}

export default async function NavigationBar({ category, navBar }: NavigationBarProps) {
  const categoryItems = category.map((category) => ({
    key: `category-${category.id}`,
    label: category.title || 'Category',
    href: `/${encodeURIComponent(category.title || category.id)}`,
    external: false,
  }))
  const manualItems = (navBar.items || []).map((item, index) => ({
    key: `${item.type}-${item.label || item.tag || item.url || index}`,
    label: item.label,
    href: item.type === 'tag' ? `/tag/${encodeURIComponent(item.tag || '')}` : item.url || '#',
    external: item.type === 'external',
  }))
  const navigationItems = [...categoryItems, ...manualItems]

  return (
    <nav className="flex w-220 items-center justify-between font-semibold">
      {navigationItems.map(({ key, label, href, external }) =>
        external ? (
          <a
            className="transition hover:text-red-600"
            href={href}
            key={key}
            rel="noreferrer"
            target="_blank"
          >
            {label}
          </a>
        ) : (
          <Link className="transition hover:text-red-600" href={href} key={key}>
            {label}
          </Link>
        ),
      )}
    </nav>
  )
}

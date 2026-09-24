import Link from 'next/link'
import getCategories from '@/data/header/getCategory'
import getNavbar from '@/data/header/getNavbar'

export default async function NavigationBar() {
  const categories = await getCategories()
  const navbar = await getNavbar()
  const categoryItems = categories.map((category) => ({
    key: `category-${category.id}`,
    label: category.title || 'Category',
    href: `/${encodeURIComponent(category.title || category.id)}`,
    external: false,
  }))
  const manualItems = (navbar.items || []).map((item, index) => ({
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

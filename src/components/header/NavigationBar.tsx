import Link from 'next/link'
import { Category, Nav } from '@/payload-types'

type NavigationBarProps = {
  category: Category[]
  navBar: Nav
}

export default function NavigationBar({ category, navBar }: NavigationBarProps) {
  return (
    <nav className="flex w-220 items-center justify-between font-semibold dark:text-white">
      {category.map((item) => (
        <Link
          className="transition hover:text-red-600"
          href={`${item.title.trim().replace(' ', '-').toLowerCase()}`}
          key={item.id}
        >
          {item.title}
        </Link>
      ))}

      {navBar.items?.map((item, index) => {
        const key = `${item.type}-${item.label || index}`
        const href =
          item.type === 'tag'
            ? `/tag/${item.tag?.replace(' ', '-').toLowerCase()}`
            : item.url || '#'

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
          <Link className="transition hover:text-red-600" href={href} key={key}>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { FaBars, FaRegUser, FaPlus } from 'react-icons/fa6'
import { Category, Nav } from '@/payload-types'
import ThemeSwitcher from '../common/ThemeSwitcher'

type MobileMenuProps = {
  category: Category[]
  navBar: Nav
  socialMediaNode: ReactNode
}

export default function MobileMenu({ category, navBar, socialMediaNode }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const menuRootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = menuRootRef.current?.closest<HTMLElement>('[data-mobile-header]')
    if (!header) return
    const updateHeaderHeight = () => setHeaderHeight(header.getBoundingClientRect().height)

    updateHeaderHeight()
    const observer = new ResizeObserver(updateHeaderHeight)
    observer.observe(header)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const bodyOverflow = document.body.style.overflow
    const documentOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = bodyOverflow
      document.documentElement.style.overflow = documentOverflow
    }
  }, [isOpen])

  const toggleMenu = () => {
    if (!isOpen) {
      const header = menuRootRef.current?.closest<HTMLElement>('[data-mobile-header]')
      if (header) setHeaderHeight(header.getBoundingClientRect().height)
    }
    setIsOpen((open) => !open)
  }

  return (
    <div ref={menuRootRef} className="flex items-center gap-4 lg:hidden">
      {/* Nút User */}
      <button aria-label="User Profile" className="text-[#E1161E] dark:text-white">
        <FaRegUser className="text-lg" />
      </button>

      <button onClick={toggleMenu} aria-label="Toggle menu">
        <FaBars className="text-xl" />
      </button>

      {/* Overlay nền đen mờ khi mở menu */}
      {isOpen && (
        <div
          className="fixed inset-x-0 bottom-0 z-40"
          style={{ top: headerHeight }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Ngăn kéo Menu (Drawer) trượt từ phải vào */}
      <div
        className={`fixed right-0 bottom-0 z-70 w-[85%] max-w-sm bg-[#f8f9fa] shadow-2xl transition-transform duration-300 ease-in-out dark:bg-gray-800 dark:text-white ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } touch-pan-y overflow-y-auto overscroll-contain`}
        style={{ top: headerHeight }}
      >
        <div className="flex flex-col p-4">
          {/* Header của Drawer: Khối Social và Theme */}
          <div className="mb-6 flex justify-end">
            <div className="flex flex-col items-end gap-3">
              {socialMediaNode}
              <ThemeSwitcher />
            </div>
          </div>

          {/* Danh sách Liên kết (Links) */}
          <nav className="flex flex-col bg-white dark:bg-gray-800">
            {category.map((item) => (
              <Link
                href={`/${item.title.trim().replace(' ', '-').toLowerCase()}`}
                key={`cat-${item.id}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between border-b border-gray-200 px-4 py-3.5 text-sm font-semibold text-gray-900 transition-colors hover:text-[#d81b60] dark:border-gray-700 dark:text-white"
              >
                <FaPlus className="text-gray-700 dark:text-gray-300" size={14} />
                <span>{item.title}</span>
              </Link>
            ))}

            {navBar.items?.map((item, index) => {
              const key = `nav-${item.type}-${item.label || index}`
              const href =
                item.type === 'tag'
                  ? `/tag/${item.tag?.replace(' ', '-').toLowerCase()}`
                  : item.url || '#'

              return (
                <div
                  key={key}
                  className="flex items-center justify-between border-b border-gray-200 px-4 py-3.5 dark:border-gray-700"
                >
                  <div className="w-4"></div>
                  {item.type === 'external' ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-gray-900 hover:text-[#d81b60] dark:text-white"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-semibold text-gray-900 hover:text-[#d81b60] dark:text-white"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

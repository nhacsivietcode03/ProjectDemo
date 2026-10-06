'use client'

import { useState, ReactNode } from 'react'
import Link from 'next/link'
import { FaBars, FaRegUser, FaChevronLeft, FaPlus } from 'react-icons/fa6'
import { Category, Nav } from '@/payload-types'

type MobileMenuProps = {
  category: Category[]
  navBar: Nav
  socialMediaNode: ReactNode // Nhận SocialMediaIcon (Server Component) truyền vào từ Header
}

export default function MobileMenu({ category, navBar, socialMediaNode }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center gap-4 lg:hidden">
      {/* Nút User */}
      <button aria-label="User Profile" className="text-[#E1161E]">
        <FaRegUser className="text-lg" />
      </button>

      {/* Nút Hamburger mở Menu */}
      <button onClick={() => setIsOpen(true)} aria-label="Mở menu">
        <FaBars className="text-xl" />
      </button>

      {/* Overlay nền đen mờ khi mở menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Ngăn kéo Menu (Drawer) trượt từ phải vào */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-[#f8f9fa] shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto`}
      >
        <div className="flex flex-col p-4">
          {/* Header của Drawer: Nút Đóng, Social Icons, Theme */}
          <div className="mb-6 flex justify-end">
            {/* Khối Social và Theme */}
            <div className="flex flex-col items-end gap-3">
              {socialMediaNode}
              <select className="flex w-24 cursor-pointer justify-end rounded border border-gray-300 bg-white px-2 py-1 text-xs outline-none hover:border-gray-400">
                <option>Light</option>
                <option>Dark</option>
              </select>
            </div>
          </div>

          {/* Danh sách Liên kết (Links) */}
          <nav className="flex flex-col bg-white">
            {/* 1. Category Items (Có dấu + bên trái) */}
            {category.map((item) => (
              <Link
                href={`/${item.title.trim().replace(' ', '-').toLowerCase()}`}
                key={`cat-${item.id}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between border-b border-gray-200 px-4 py-3.5 text-sm font-semibold text-gray-900 transition-colors hover:text-[#d81b60]"
              >
                <FaPlus className="text-gray-700" size={14} />
                <span>{item.title}</span>
              </Link>
            ))}

            {/* 2. NavBar Items (Các mục tĩnh, tuỳ chọn hiển thị dấu + hoặc không) */}
            {navBar.items?.map((item, index) => {
              const key = `nav-${item.type}-${item.label || index}`
              const href =
                item.type === 'tag'
                  ? `/tag/${item.tag?.replace(' ', '-').toLowerCase()}`
                  : item.url || '#'

              // Giả định các mục nav phụ (như #Marilokal) không có dấu + theo thiết kế
              return (
                <div
                  key={key}
                  className="flex items-center justify-between border-b border-gray-200 px-4 py-3.5"
                >
                  <div className="w-4"></div>{' '}
                  {/* Khoảng trống để đẩy text sang phải nếu không có dấu + */}
                  {item.type === 'external' ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-gray-900 hover:text-[#d81b60]"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-semibold text-gray-900 hover:text-[#d81b60]"
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

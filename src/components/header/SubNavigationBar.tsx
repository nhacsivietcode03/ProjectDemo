'use client'

import getSubCategoryData from '@/data/getSubCategoryData'
import { Category } from '@/payload-types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

type SubNavigationBarProps = {
  categoryData: Category[]
}

export default function SubNavigationBar({ categoryData }: SubNavigationBarProps) {
  const path = usePathname()

  const [subCategoryList, setSubCategoryList] = useState<Category[]>([])

  // 1. Cắt đường dẫn thành các phần
  const pathSegments = path.split('/').filter(Boolean)

  // 2. Chỉ cho phép hiện ở trang chủ của chuyên mục (1 tầng) hoặc trang danh mục con (2 tầng)
  const isValidLevel = pathSegments.length === 1 || pathSegments.length === 2

  // 3. Luôn lấy phần tử đầu tiên làm chuyên mục gốc (VD: lấy 'berita')
  const rootSlug = pathSegments[0]

  // 4. Tìm currentCategory dựa vào rootSlug
  const currentCategory = categoryData.find((category) => category.slug === rootSlug)

  useEffect(() => {
    // Nếu không tìm thấy category hợp lệ, dọn dẹp state
    if (!currentCategory || !currentCategory.id) {
      setSubCategoryList([])
      return
    }

    getSubCategoryData(currentCategory.id)
      .then((response) => {
        setSubCategoryList(response)
      })
      .catch((error) => console.error('Lỗi gọi API:', error))
  }, [currentCategory])

  // 5. Thêm điều kiện isValidLevel vào đây để chặn những trang bài viết chi tiết (3 tầng trở lên)
  if (!isValidLevel || !currentCategory || subCategoryList.length === 0) {
    return null
  }

  return (
    // Note: Thêm `relative` và bỏ bớt `py-3` để thanh underline ôm khít chân menu
    <div className="relative flex w-220 items-center font-semibold text-white dark:text-white">
      {subCategoryList.map((subCategory) => {
        // Tạo đường dẫn chuẩn cho danh mục con
        const href = `/${currentCategory.slug}/${subCategory.slug}`

        // Kiểm tra xem có đang đứng chính xác ở danh mục con này không
        const isActive = path === href

        return (
          <Link
            key={subCategory.id}
            href={href}
            // Thêm class `relative pb-3` để tạo khoảng trống đẩy thanh gạch trắng xuống chân
            className="relative px-5 py-3 text-white"
          >
            <span>{subCategory.title}</span>

            {/* Nếu đang active, vẽ thêm 1 block nhỏ màu trắng bám ở dưới đáy (bottom-0) */}
            {isActive && <span className="absolute right-0 bottom-0 left-0 h-1 w-full bg-white" />}
          </Link>
        )
      })}
    </div>
  )
}

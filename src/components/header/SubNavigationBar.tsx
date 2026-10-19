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

  const currentCategory = categoryData.find((category) => `/${category.slug}` === path)

  useEffect(() => {
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

  if (path === '/' || !currentCategory || subCategoryList.length === 0) {
    return null
  }

  return (
    <div className="flex w-220 items-center gap-12 py-3 font-semibold text-white dark:text-white">
      {subCategoryList.map((subCategory) => (
        <Link key={subCategory.id} href={`/${currentCategory.slug}/${subCategory.slug}`}>
          {subCategory.title}
        </Link>
      ))}
    </div>
  )
}

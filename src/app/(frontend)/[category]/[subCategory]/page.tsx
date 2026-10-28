'use client'
import { useParams } from 'next/navigation'
import { Suspense } from 'react'

const GetParam = () => {
  const params = useParams<{ category: string; subCategory: string }>()
  const { subCategory } = params
  return <div className="ml-2">Đây là trang {subCategory}</div>
}

export default function SubCategoryPage() {
  return (
    <div>
      <Suspense>
        <GetParam />
      </Suspense>
    </div>
  )
}

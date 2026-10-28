import { Suspense } from 'react'
import TypePage from './TypePage'
import getCategoryListData from '@/data/getCategoryListData'
import { Category } from '@/payload-types'

type CategoryPageProps = PageProps<'/[category]'>

export async function generateStaticParams() {
  const categoryList = await getCategoryListData()
  return categoryList.map((category: Category) => ({
    category: category.slug,
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div>
      <Suspense fallback={''}>
        <TypePage params={params} />
      </Suspense>
    </div>
  )
}

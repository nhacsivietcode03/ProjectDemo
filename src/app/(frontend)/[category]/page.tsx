import { Suspense } from 'react'

type CategoryPageProps = PageProps<'/[category]'>

async function CategoryContent({ params }: { params: CategoryPageProps['params'] }) {
  const { category } = await params
  return <div className="ml-2">{category}</div>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div>
      <Suspense fallback={''}>
        <CategoryContent params={params} />
      </Suspense>
    </div>
  )
}

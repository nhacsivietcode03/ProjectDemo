import { Suspense } from 'react'
import TypePage from './TypePage'

type CategoryPageProps = PageProps<'/[category]'>

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div>
      <Suspense fallback={''}>
        <TypePage params={params} />
      </Suspense>
    </div>
  )
}

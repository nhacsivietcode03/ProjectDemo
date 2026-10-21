import ArticleDetail from '@/components/articleDetail/ArticleDetail'

import { Suspense } from 'react'

type ArticleDetailPageProps = PageProps<'/[category]/[subCategory]/[...slug]'>

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  return (
    <div>
      <Suspense>
        <ArticleDetail params={params} />
      </Suspense>
    </div>
  )
}

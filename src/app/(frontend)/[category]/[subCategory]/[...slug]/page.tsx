import ArticleDetail from '@/components/articleDetail/ArticleDetail'
import FooterArticleDetail from '@/components/articleDetail/FooterArticleDetail'
import SideBarArticleDetail from '@/components/articleDetail/SideBarArticleDetail'
import { Suspense } from 'react'

type ArticleDetailPageProps = PageProps<'/[category]/[subCategory]/[...slug]'>

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  return (
    <div className="container pt-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Suspense>
            <ArticleDetail params={params} />
          </Suspense>
          <Suspense>
            <FooterArticleDetail />
          </Suspense>
        </div>
        <div className="lg:col-span-4">
          <Suspense>
            <SideBarArticleDetail />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

import { ArticleItem } from '@/data/homepage/getMainHomePageData'
import { HeaderTitle } from '../common'
import { CommonArticle, HeroArticle } from '../article'

type DisyorkanProps = {
  disyorkanData: ArticleItem[]
}

export default async function Disyorkan({ disyorkanData }: DisyorkanProps) {
  const heroArticle = disyorkanData.slice(0, 1)
  const listArticles = disyorkanData.slice(1, 8)

  return (
    <section className="mt-5">
      <HeaderTitle title="Disyorkan" label="Disyourkan" />

      <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-12">
        {/* Ảnh */}
        <div className="col-span-6">
          <HeroArticle data={heroArticle} />
        </div>

        {/*6 bài viết bên phải*/}
        <div className="col-span-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <CommonArticle articlesData={listArticles} />
          </div>
        </div>
      </div>
    </section>
  )
}

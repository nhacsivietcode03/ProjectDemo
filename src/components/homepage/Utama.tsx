import type { UtamaItem } from '@/data/homepage/getMainHomePageData'
import HeaderTitle from '../common/HeaderSection'
import SideArticles from '../article/SideArticles'
import HeroArticle from '../article/HeroArticle'
import BulletArticleList from '../article/BulletArticleList'
import Block3x3Articles from '../article/Block3x3Articles'

type UtamaProps = {
  utamaData: UtamaItem[]
}

export default async function Utama({ utamaData }: UtamaProps) {
  const heroArticle = utamaData.slice(0, 1)
  const sideArticles = utamaData.slice(1, 5)
  const belowHeroArticles = utamaData.slice(5, 8)
  const block3x3Articles = utamaData.slice(8, 17)
  return (
    <section>
      <HeaderTitle title="Utama" />
      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="hidden lg:col-span-4 lg:block">
          <SideArticles data={sideArticles} />
        </div>
        <div className="lg:col-span-8">
          <HeroArticle data={heroArticle} />
          <div className="hidden lg:block">
            <BulletArticleList data={belowHeroArticles} />
          </div>
        </div>
      </div>
      <Block3x3Articles data={block3x3Articles} />
    </section>
  )
}

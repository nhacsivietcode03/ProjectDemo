import type { UtamaItem } from '@/data/homepage/getMainHomePageData'
import HeaderTitle from '../common/HeaderSection'
import SideArticles from '../common/SideArticles'
import HeroArticle from '../common/HeroArticle'
import BulletArticleList from '../common/BulletArticleList'
import Block3x3Articles from '../common/Block3x3Articles'

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
      <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-[auto_1fr]">
        <div className="flex flex-col gap-4">
          <SideArticles data={sideArticles} />
        </div>
        <div>
          <HeroArticle data={heroArticle} />
          <BulletArticleList data={belowHeroArticles} />
        </div>
      </div>
      <Block3x3Articles data={block3x3Articles} />
    </section>
  )
}

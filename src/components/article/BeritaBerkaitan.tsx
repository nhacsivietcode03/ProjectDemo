import type { ArticleItem } from '@/data/getMainHomePageData'
import { CommonArticle } from '../article'
import { HeaderTitle } from '../common'

type beritaBerkaitanDataProps = {
  beritaBerkaitanData: ArticleItem[]
}

export default async function BeritaBerkaitan({ beritaBerkaitanData }: beritaBerkaitanDataProps) {
  const block3x3Articles = beritaBerkaitanData.slice(0, 9)
  return (
    <section>
      <HeaderTitle title="Berita Berkaitan" />
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <CommonArticle articlesData={block3x3Articles} />
      </div>
    </section>
  )
}

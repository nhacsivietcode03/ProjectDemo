import type { ArticleItem } from '@/data/getMainHomePageData'
import { SideArticles, HeroArticle, CommonArticle } from '../article'
import { AdSlot, HeaderTitle } from '../common'

type UtamaCategoryProps = {
    data: ArticleItem[]
}

export default async function UtamaCategory({ data }: UtamaCategoryProps) {
    if (!data || data.length === 0) return null;

    const heroArticle = data.slice(0, 1)
    const sideArticles = data.slice(1, 4)
    const block3x3Articles = data.slice(4)
    const article = heroArticle[0]

    const firstCategory = article?.category?.[0]

    const categoryTitle =
        firstCategory && typeof firstCategory === 'object' && 'title' in firstCategory
            ? String(firstCategory.title)
            : 'Berita Utama'

    return (
        <section>
            <HeaderTitle title={categoryTitle} />
            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
                <div className="hidden lg:col-span-4 lg:block">
                    <SideArticles data={sideArticles} />
                </div>
                <div className="lg:col-span-8">
                    <HeroArticle data={heroArticle} />
                    <div className="mt-5">
                        <AdSlot slot="320x100" width={320} height={100} className="lg:hidden" />
                    </div>
                </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <CommonArticle articlesData={block3x3Articles} />
            </div>
        </section>
    )
}

import { Vertical6Articles } from "@/components/article"
import UtamaCategory from "@/components/CategoryPage/UtamaCategory"
import { AdSlot } from "@/components/common"
import { GaleriFotoSection, InfografikSection, PodCastSection, Terkini, TrendingSection } from "@/components/sidebar"
import { getSideBarData } from "@/data"
import getArticlesBySubCategorySlug from "@/data/getArticlesBySubCategorySlug"
import getCategoryPageData from "@/data/getCategoryPageData"
import getSubCategoryDataBySlug from "@/data/getSubCategoryDataBySlug"

type CategoryViewProps = {
    param: string
}

export default async function CategoryView({ param }: CategoryViewProps) {
    const [sideBarData, subCategoryList, CategoryPageData] = await Promise.all([
        getSideBarData(), getSubCategoryDataBySlug(param), getCategoryPageData(param)
    ])

    const { galeriData, infografikData, terkiniData, trendingData, videosData } = sideBarData
    const { UtamaCategoryData } = CategoryPageData
    const subCategoryBlocksData = await Promise.all(
        subCategoryList.map(async (subCat: any) => {
            const articles = await getArticlesBySubCategorySlug(subCat.slug, param)
            return {
                id: subCat.id,
                title: subCat.title,
                slug: subCat.slug,
                articles: articles
            }
        })
    )
    return (
        <div>
            <div className="container pt-5">

                <div className="flex flex-col gap-5 lg:grid lg:grid-cols-12 lg:gap-5">
                    <div className="contents lg:block lg:col-span-8 lg:gap-5">
                        <div className="order-1 lg:order-0">
                            <UtamaCategory data={UtamaCategoryData} />
                        </div>
                        <div className="order-3 lg:order-0">
                            {subCategoryBlocksData.map((blockAticles) => (
                                blockAticles?.articles.length > 0 && (
                                    <div key={blockAticles.id}>
                                        <Vertical6Articles
                                            data={blockAticles.articles}
                                            typeTitle="subCategory"
                                        />
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                    <div className="contents lg:block lg:col-span-4 ">
                        <div className="order-2 lg:order-0">
                            <AdSlot slot="300x250" width={300} height={250} />
                            <Terkini terkiniData={terkiniData} />
                            <TrendingSection trendingData={trendingData} />
                            <AdSlot slot="300x600" width={300} height={600} />
                        </div>
                        <div className="order-4 lg:order-0">
                            <PodCastSection podCastData={videosData} />
                            <AdSlot slot="300x250" width={300} height={250} className="hidden lg:block" />
                            <InfografikSection infografikData={infografikData} />
                            <GaleriFotoSection galeriData={galeriData} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
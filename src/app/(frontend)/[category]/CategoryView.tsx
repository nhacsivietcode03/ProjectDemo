import UtamaCategory from "@/components/CategoryPage/UtamaCategory"
import { AdSlot } from "@/components/common"
import { Terkini, TrendingSection } from "@/components/sidebar"
import { getSideBarData } from "@/data"
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
    console.log(UtamaCategoryData);
    return <div>
        <div className="container pt-5">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <UtamaCategory data={UtamaCategoryData} />
                </div>
                <div className="lg:col-span-4">
                    <AdSlot slot="300x250" width={300} height={250} />
                    <Terkini terkiniData={terkiniData} />
                    <TrendingSection trendingData={trendingData} />
                </div>
            </div>
        </div>
    </div>
}
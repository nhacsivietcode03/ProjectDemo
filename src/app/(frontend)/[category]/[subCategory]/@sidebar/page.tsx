import { AdSlot } from "@/components/common"
import { PodCastSection, Terkini, TrendingSection } from "@/components/sidebar"
import { getSideBarData } from "@/data"

export default async function SideBar() {
    const { terkiniData, trendingData, videosData } = await getSideBarData()
    return <div>
        <AdSlot slot="300x250" width={300} height={250} />
        <Terkini terkiniData={terkiniData} />
        <TrendingSection trendingData={trendingData} />
        <AdSlot slot="300x600" width={300} height={600} />
        <PodCastSection podCastData={videosData} />
        <AdSlot slot="300x250" width={300} height={250} className="hidden lg:block mb-5" />
    </div>
}
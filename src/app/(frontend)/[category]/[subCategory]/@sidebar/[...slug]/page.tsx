


import { AdSlot } from "@/components/common"
import { GaleriFotoSection, InfografikSection, PodCastSection, Terkini, TrendingSection } from "@/components/sidebar"
import { getSideBarData } from "@/data"

export default async function SideBar() {
    const { terkiniData, trendingData, videosData, galeriData, infografikData } = await getSideBarData()
    return <div>
        <AdSlot slot="300x250" width={300} height={250} className="hidden lg:block" />
        <AdSlot slot="300x600" width={300} height={600} className="lg:hidden" />
        <Terkini terkiniData={terkiniData} />
        <TrendingSection trendingData={trendingData} />
        <AdSlot slot="300x600" width={300} height={600} className="hidden lg:block" />
        <PodCastSection podCastData={videosData} />
        <AdSlot slot="300x250" width={300} height={250} className="hidden lg:block" />
        <InfografikSection infografikData={infografikData} />
        <GaleriFotoSection galeriData={galeriData} />
    </div>
}
import { AdSlot } from "@/components/common";
import { PodCastSection, Terkini, TrendingSection } from "@/components/sidebar";
import { getSideBarData } from "@/data";



export default async function TagPageLayout({ children }: { children: React.ReactNode }) {
    const { terkiniData, trendingData, videosData } = await getSideBarData()
    return <div className="container mt-5">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="lg:col-span-8">
                {children}
            </div>
            <div className="lg:col-span-4">
                <AdSlot slot="300x250" width={300} height={250} />
                <Terkini terkiniData={terkiniData} />
                <TrendingSection trendingData={trendingData} />
                <AdSlot slot="300x600" width={300} height={600} />
                <PodCastSection podCastData={videosData} />
                <AdSlot slot="300x250" width={300} height={250} className="hidden lg:block mb-5" />
            </div>
        </div>
    </div>
}
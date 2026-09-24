import AdSlot from '../common/Ads'
import PodCastSection from './PostCastSection'
import Terkini from './Terkini'
import TrendingSection from './TrendingSection'
export default async function MainSideBar() {
  return (
    <div>
      <AdSlot slot="300x250" width={300} height={250} />
      <Terkini />
      <TrendingSection />
      <PodCastSection />
    </div>
  )
}

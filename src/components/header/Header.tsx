import Image from 'next/image'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import getHeader from '@/data/header/getHeader'
import { Media } from '@/payload-types'
import SocialMediaIcon from '@/components/social/SocialMediaIcon'
import NavigationBar from './NavigationBar'
import NewsCarousel from './NewsCarousel'
import Trending from './Trending'
import AdSlot from '../Common/Ads'

export default async function Header() {
  // Lấy dữ liệu Header từ Payload
  const headerData = await getHeader()

  // Kiểm tra dữ liệu logo và site tittle có phải là Media hay ko hay là String
  const logo = headerData.logo as Media | null
  const siteTitle =
    headerData && typeof headerData.siteTitle === 'object' ? headerData.siteTitle : null

  const socialMedias = headerData.socialMediaLinks || []
  const carousels = headerData.caroselItems || []
  console.log(carousels)

  return (
    <header className="w-full">
      <div className="container flex justify-between border-b border-gray-200">
        {/*Left Top bar*/}
        <div className="flex items-center gap-3 p-2">
          {/*logo*/}
          <Image
            src={logo?.url || ''}
            alt={logo?.alt || 'Site Logo'}
            width={80}
            height={50}
            priority
          />
          <Image src={siteTitle?.url || ''} alt={siteTitle?.alt || ''} width={360} height={50} />
        </div>
        {/*Right top bar*/}
        <div>
          {/* Time */}
          <p className="p-2 text-right text-sm">
            {new Intl.DateTimeFormat('ms-MY', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
              timeZone: 'Asia/Kuala_Lumpur',
            })
              .format(new Date())
              .replace(' pada ', ', ')
              .replace(' PG', ' am')
              .replace(' PTG', ' pm')}
          </p>
          {/* Social icons + Theme toggle */}
          <div className="flex gap-3 pt-2">
            <div className="mr-6 flex items-center gap-2">
              {socialMedias.map((social) => (
                <SocialMediaIcon key={social.platform} social={social} />
              ))}
            </div>
            <select className="text-gray-850 flex w-24 cursor-pointer justify-end rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs outline-none hover:border-gray-400">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container flex h-13 items-center justify-between">
        <NavigationBar />
        <div className="relative flex items-center">
          <input placeholder="Cari kata kunci" className="w-60 rounded border bg-gray-100 p-0.5" />
          <FaMagnifyingGlass className="absolute right-3 cursor-pointer text-gray-600" size={16} />
        </div>
      </div>
      <div className="mt-3">
        <NewsCarousel carousel={carousels} />
      </div>
      <Trending />
      <div className="container mt-4 w-full">
        <AdSlot slot="970x90" width={970} height={90} />
      </div>
    </header>
  )
}

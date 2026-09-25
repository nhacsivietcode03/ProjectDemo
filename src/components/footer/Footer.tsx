import Logo from '../common/Logo'
import SocialMediaIcon from '../common/SocialMediaIcon'
import getFooter from '@/data/footer/getFooterData'
import Image from 'next/image'

export default async function Footer() {
  const { footerData } = await getFooter()
  const Stores = footerData.AppStore || []
  const bottomBar = footerData.bottomBar
  return (
    <footer className="w-full bg-[#444444]">
      {/*Thông tin liên hệ*/}
      <div className="container">
        <div className="flex items-center justify-between border-b border-amber-50">
          <div className="py-5">
            <Logo />
          </div>
          <div className="flex items-center gap-3">
            <SocialMediaIcon />
            <div className="flex items-center gap-3">
              {Stores.map((store) => {
                const storeImage =
                  typeof store.image === 'object' && store.image !== null ? store.image : null

                if (!storeImage?.url) return null

                return (
                  <a key={store.id} href={store.url} target="_blank" rel="noreferrer noopener">
                    <Image
                      src={storeImage.url}
                      alt={storeImage.alt}
                      width={120}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
        {/*Danh mục*/}
        <div className="grid grid-cols-2 gap-x-40 gap-y-8 py-10 text-sm text-gray-200 sm:grid-cols-3 lg:grid-cols-5">
          <div>
            <h2 className="mb-2 font-medium text-white">Berita</h2>
            <ul className="space-y-1">
              <li>BHPLUS</li>
              <li>Nasional</li>
              <li>Kes</li>
              <li>Politik</li>
              <li>Pendidikan</li>
              <li>Wilayah</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-2 font-medium text-white">Sukan</h2>
            <ul className="space-y-1">
              <li>Dunia</li>
              <li>Hiburan</li>
              <li>Bisnes</li>
              <li>Rencana</li>
              <li>Wanita</li>
              <li>Hujung Minggu</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-2 font-medium text-white">Multimedia</h2>
            <ul className="space-y-1">
              <li>Foto</li>
              <li>BHTV</li>
              <li>Infografik</li>
              <li className="pt-5">Langgan</li>
              <li>Akhbar Digital</li>
              <li>Akhbar BH</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-2 font-medium text-white">Perkhidmatan</h2>
            <ul className="space-y-1">
              <li>Iklan Web</li>
              <li>1Klassifieds</li>
              <li>NSTP KLiK</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-2 font-medium text-white">Radio</h2>
            <ul className="space-y-1">
              <li>Dapatkan Audio+</li>
              <li>Hot FM</li>
              <li>Buletin FM</li>
              <li>Fly FM</li>
              <li>Eight FM</li>
              <li>Molek FM</li>
            </ul>
          </div>
        </div>
      </div>
      {/*Địa chỉ*/}
      <div className="flex w-full flex-col gap-3 bg-[#d5003d] px-6 py-4 text-sm text-white md:flex-row md:items-center md:justify-between">
        <p>{bottomBar.copyright}</p>
        <div className="flex flex-wrap items-center gap-2">
          {bottomBar.links?.map((link, index) => (
            <div key={link.id ?? link.label} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">|</span>}
              <span>{link.label}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

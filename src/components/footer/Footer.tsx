import { Logo, SocialMediaIcon } from '../common'
import { getFooter } from '@/data'
import Image from 'next/image'

export default async function Footer() {
  const { footerData } = await getFooter()
  const Stores = footerData.AppStore || []
  const bottomBar = footerData.bottomBar

  // Tách các danh mục ra các biến để tái sử dụng cho cả giao diện Mobile và Desktop
  const listBerita = (
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
  )

  const listSukan = (
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
  )

  const listMultimedia = (
    <div>
      <h2 className="mb-2 font-medium text-white">Multimedia</h2>
      <ul className="space-y-1">
        <li>Foto</li>
        <li>BHTV</li>
        <li>Infografik</li>
      </ul>
    </div>
  )

  const listLanggan = (
    <div>
      <h2 className="mb-2 font-medium text-white">Langgan</h2>
      <ul className="space-y-1">
        <li>Akhbar Digital</li>
        <li>Akhbar BH</li>
      </ul>
    </div>
  )

  const listPerkhidmatan = (
    <div>
      <h2 className="mb-2 font-medium text-white">Perkhidmatan</h2>
      <ul className="space-y-1">
        <li>Iklan Web</li>
        <li>1Klassifieds</li>
        <li>NSTP KLiK</li>
      </ul>
    </div>
  )

  const listRadio = (
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
  )

  return (
    <footer className="w-full bg-[#444444]">
      <div className="container">
        {/* Top Section: Logo & Social/Stores */}
        <div className="flex flex-col items-center justify-center border-b border-gray-600 py-8 lg:flex-row lg:justify-between lg:py-5">
          <div className="mb-6 lg:mb-0">
            <Logo />
          </div>
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-4">
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

        {/* Links Section - MOBILE (2 Cột) */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 py-10 text-xs text-gray-200 lg:hidden">
          <div className="flex flex-col gap-6">
            {listBerita}
            {listSukan}
            {listMultimedia}
          </div>
          <div className="flex flex-col gap-6">
            {listLanggan}
            {listPerkhidmatan}
            {listRadio}
          </div>
        </div>

        {/* Links Section - DESKTOP (5 Cột) */}
        <div className="hidden gap-x-10 py-10 text-sm text-gray-200 lg:grid lg:grid-cols-5">
          {listBerita}
          {listSukan}
          <div>
            {listMultimedia}
            <div className="mt-6">{listLanggan}</div>
          </div>
          {listPerkhidmatan}
          {listRadio}
        </div>
      </div>

      {/* Bottom Bar: Copyright & Links */}
      <div className="flex w-full flex-col gap-6 bg-[#d81b60] px-6 py-8 text-center text-xs text-white lg:flex-row lg:items-center lg:justify-between lg:py-4 lg:text-left lg:text-sm">
        <div className="mx-auto flex flex-col gap-1 lg:mx-0">
          {/* Tuỳ thuộc vào chuỗi nhận được từ CMS, có thể dùng whitespace-pre-line để tự động xuống dòng nếu có \n */}
          <p className="whitespace-pre-line">{bottomBar.copyright}</p>
        </div>

        {/* Chuyển dấu '|' sang dạng ẩn ở mobile, hiển thị ở desktop */}
        <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
          {bottomBar.links?.map((link, index) => (
            <div key={link.id ?? link.label} className="flex items-center gap-2">
              {index > 0 && (
                <span aria-hidden="true" className="hidden lg:block">
                  |
                </span>
              )}
              <span className="cursor-pointer hover:underline">{link.label}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

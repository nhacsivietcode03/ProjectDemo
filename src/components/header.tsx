import Image from 'next/image'
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
  FaMagnifyingGlass,
} from 'react-icons/fa6'
import getHeader from '@/data/header/getHeader'
import { Media } from '@/payload-types'

export default async function Header() {
  const headerData = await getHeader()
  const logo = headerData?.logo as Media
  return (
    <header className="w-full">
      <div className="container flex justify-between border-b border-gray-200">
        {/*Left Top bar*/}
        <div className="flex items-center gap-3 p-2">
          {/*logo*/}
          <Image
            src={logo?.url || ''}
            alt={logo?.alt || 'Site Logo'}
            width={70}
            height={50}
            priority
          />
          <Image
            src="/image/fed3e89abbf06beeb15489920dff64202115a58c.png"
            width={350}
            height={50}
            alt=""
          />
        </div>
        {/*Right top bar*/}
        <div>
          {/* Time */}
          <p className="p-2 text-right text-sm">Isnin, 26 Mei 2025, 3:30pm</p>
          {/* Social icons + Theme toggle */}
          <div className="flex gap-5">
            <div className="flex items-center gap-1.5">
              {/* Facebook */}
              <a
                href="#"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-85"
                title="Facebook"
              >
                <FaFacebookF size={15} />
              </a>

              {/* X (Twitter) */}
              <a
                href="#"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white hover:opacity-85"
                title="X"
              >
                <FaXTwitter size={15} />
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white hover:opacity-85"
                title="Instagram"
              >
                <FaInstagram size={15} />
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF0000] text-white hover:opacity-85"
                title="YouTube"
              >
                <FaYoutube size={15} />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0A66C2] text-white hover:opacity-85"
                title="LinkedIn"
              >
                <FaLinkedinIn size={15} />
              </a>

              {/* TikTok */}
              <a
                href="#"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-white hover:opacity-85"
                title="TikTok"
              >
                <FaTiktok size={15} />
              </a>
            </div>
            <select className="text-gray-850 w-24 cursor-pointer rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs outline-none hover:border-gray-400">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container flex h-13 items-center justify-between">
        <div className="flex cursor-pointer items-center gap-4 font-semibold">
          <p className="transition hover:text-red-600">Beria</p>
          <p className="transition hover:text-red-600">Sukan</p>
          <p className="transition hover:text-red-600">Hiburan</p>
          <p className="transition hover:text-red-600">Dunia</p>
          <p className="transition hover:text-red-600">Bisnes</p>
          <p className="transition hover:text-red-600">Rencana</p>
          <p className="transition hover:text-red-600">Gaya Hidup</p>
          <p className="transition hover:text-red-600">#Marilokal</p>
          <p className="transition hover:text-red-600">1Klassified</p>
        </div>
        <div className="relative flex items-center">
          <input placeholder="Cari kata kunci" className="w-80 rounded border bg-gray-100 p-0.5" />
          <FaMagnifyingGlass className="absolute right-3 cursor-pointer text-gray-600" size={16} />
        </div>
      </div>
    </header>
  )
}

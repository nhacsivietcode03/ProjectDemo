import Image from 'next/image'

export default function Header() {
  return (
    <header className="w-full">
      <div className="flex border-b border-gray-200">
        {/*Left Top bar*/}
        <div className="flex p-2 gap-3 ml-3">
          {/*logo*/}
          <Image src="/image/logo.png" width={70} height={50} alt="Logo của dự án" />
          <Image
            src="/image/fed3e89abbf06beeb15489920dff64202115a58c.png"
            width={350}
            height={50}
            alt=""
          />
        </div>
        {/*Right top bar*/}
        <div className="flex">
          {/* Time */}
          <p className="text-sm">Isnin, 26 Mei 2025, 3:30pm</p>
          {/* Social icons + Theme toggle */}
          <div>
            <button>Light</button>
          </div>
        </div>
        <div></div>
      </div>
      <div></div>
    </header>
  )
}

import Link from 'next/link'

type HeaderTitleProps = {
  title: string
  label?: string | null
  href?: string
}

export default function HeaderTitle({ title, label, href }: HeaderTitleProps) {
  const linkHref = href?.toLocaleLowerCase().replace(' ', '-') || (label ? `/${label.replace(' ', '-').toLowerCase()}` : '')

  return (
    <div className="mt-2 mb-5 flex items-center justify-between dark:text-white">
      <h2 className="relative inline-block py-4 text-3xl font-semibold">
        {title}
        <span className="absolute bottom-2 left-0 h-1 w-12.5 rounded-full bg-red-600" />
      </h2>

      {label ? (
        <Link
          href={linkHref} // <-- 3. Gắn đường dẫn chuẩn vào đây
          className="flex items-center gap-2 pt-2 text-sm font-medium text-black hover:text-red-600 dark:text-white"
          prefetch={false}
        >
          Lagi {label}
          <span aria-hidden="true" className="pb-2 text-3xl leading-none text-red-600">
            ›
          </span>
        </Link>
      ) : null}
    </div>
  )
}
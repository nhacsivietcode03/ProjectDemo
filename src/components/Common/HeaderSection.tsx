import Link from 'next/link'

type HeaderTitleProps = {
  title: string
  label?: string | null
}

export default function HeaderTitle({ title, label }: HeaderTitleProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="relative inline-block py-4 text-3xl font-semibold">
        {title}
        <span className="absolute bottom-2 left-0 h-1 w-12.5 rounded-full bg-red-600" />
      </h2>

      {label ? (
        <Link
          href={label}
          className="flex items-center gap-2 pt-2 text-sm font-medium text-black hover:text-red-600"
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

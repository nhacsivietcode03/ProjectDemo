type HeaderTitleProps = {
  title: string
}

export default function HeaderTitle({ title }: HeaderTitleProps) {
  return (
    <h2 className="relative inline-block py-4 pb-1.5 text-3xl font-semibold">
      {title}
      <span className="absolute bottom-0 left-0 h-1 w-12.5 rounded-full bg-red-600" />
    </h2>
  )
}

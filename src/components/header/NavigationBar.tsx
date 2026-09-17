import getCategories from '@/data/header/getCategory'

export default async function NavigationBar() {
  const categories = await getCategories()

  return (
    <div className="flex w-220 cursor-pointer items-center justify-between font-semibold">
      {categories.map((category) => (
        <p className="transition hover:text-red-600" key={category.id}>
          {category.name}
        </p>
      ))}
    </div>
  )
}

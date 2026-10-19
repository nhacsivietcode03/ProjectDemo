import { Suspense } from 'react'

export async function generateStaticParams() {
  return [{ category: 'rencana' }, { category: 'berita' }, { category: 'hiburan' }]
}

type CategoryPageProps = {
  params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  return <div>{category}</div>
}

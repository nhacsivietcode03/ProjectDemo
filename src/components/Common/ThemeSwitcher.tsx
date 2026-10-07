'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Tránh lỗi Hydration mismatch giữa Server và Client
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Trả về một khối rỗng giữ chỗ có cùng kích thước để không bị giật layout
    return <div className="h-[26px] w-24 rounded-lg border border-transparent"></div>
  }

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="flex w-24 cursor-pointer justify-end rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs text-gray-800 outline-none hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  )
}

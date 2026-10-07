import type { Metadata } from 'next'
import React from 'react'
import './styles.css'

import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { ThemeProvider } from '@/components/common/ThemeProvider'
export const metadata: Metadata = {
  description: 'Demo Project from OnNext Digital',
  title: 'BH Online',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-800 dark:text-white">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

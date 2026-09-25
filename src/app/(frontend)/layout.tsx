import type { Metadata } from 'next'
import React from 'react'
import './styles.css'

import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
export const metadata: Metadata = {
  description: 'Demo Project from OnNext Digital',
  title: 'BH Online',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  )
}

'use client'
import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import { MinigamesProvider } from '@/contexts/minigamesContext'
import '@/styles/globals.scss'

const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cidade Alta | Minigames',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={lexend.className}>
        <MinigamesProvider>{children}</MinigamesProvider>
      </body>
    </html>
  )
}

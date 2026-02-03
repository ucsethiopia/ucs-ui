import React from "react"
import type { Metadata, Viewport } from 'next'
import { Source_Sans_3, Playfair_Display } from 'next/font/google'

import './globals.css'

const _sourceSans = Source_Sans_3({ 
  subsets: ["latin"],
  variable: '--font-source-sans',
  display: 'swap',
});

const _playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UCS Ethiopia | Ultimate Consultancy Service',
  description: 'Driving growth and transformation for Ethiopian enterprises. Strategic advisory, training, research, and communications services based in Bole, Addis Ababa.',

  keywords: ['consultancy', 'Ethiopia', 'business advisory', 'training', 'Addis Ababa', 'enterprise'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a2744',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}

      </body>
    </html>
  )
}

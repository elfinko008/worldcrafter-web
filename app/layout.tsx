import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Nexyra Engine — AI-Powered Roblox Development',
    template: '%s | Nexyra Engine',
  },
  description:
    'Nexyra Engine by Nexyra Labs. The most advanced AI assistant for Roblox Luau development. Code faster. Build better.',
  keywords: [
    'Roblox',
    'Luau',
    'AI',
    'Code Generation',
    'Nexyra',
    'Game Development',
  ],
  authors: [{ name: 'Nexyra Labs' }],
  creator: 'Nexyra Labs',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'https://nexyra.gg'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Nexyra Engine — AI-Powered Roblox Development',
    description:
      'The most advanced AI assistant for Roblox Luau development.',
    siteName: 'Nexyra Engine',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexyra Engine',
    description: 'AI-Powered Roblox Luau Development by Nexyra Labs.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* JetBrains Mono for Code Blocks */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {/* Ambient Background Glows */}
        <div className="ambient-glow ambient-glow-1" aria-hidden="true" />
        <div className="ambient-glow ambient-glow-2" aria-hidden="true" />

        {/* Main Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  )
}
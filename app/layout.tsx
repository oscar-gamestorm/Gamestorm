import type { Metadata } from 'next'
import './globals.css'
import { Orbitron } from 'next/font/google'
import { AuthProvider } from '@/providers/authProvider'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'GameStorm | Discover Games That Fit Your Device',
  description:
    'GameStorm helps you discover games and see minimum system requirements across PC, console, and mobile devices.',

  applicationName: 'GameStorm',

  keywords: [
    'games',
    'gaming',
    'pc games',
    'console games',
    'system requirements',
    'game compatibility',
    'gamestorm',
  ],

  authors: [{ name: 'GameStorm' }],

  openGraph: {
    title: 'GameStorm',
    description:
      'Discover games and check minimum system requirements before you play.',
    type: 'website',
  },

  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={orbitron.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

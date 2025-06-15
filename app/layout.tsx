import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'

export const metadata: Metadata = {
  title: 'HiKo - 외국인을 위한 한국 생활 통합 플랫폼',
  description: '하이코는 한국에 거주하는 외국인들을 위한 통합 생활 플랫폼입니다. 언어 장벽을 해결하고, 정보 격차를 줄이며, 커뮤니티를 제공합니다.',
  keywords: '한국생활, 외국인, 번역, 커뮤니티, 생활정보',
  openGraph: {
    title: 'HiKo - 외국인을 위한 한국 생활 통합 플랫폼',
    description: '하이코는 한국에 거주하는 외국인들을 위한 통합 생활 플랫폼입니다.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

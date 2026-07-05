import type { Metadata } from 'next';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { getTotalShlokaCount } from '@/services/shlokaSearchService';

export const metadata: Metadata = {
  metadataBase: new URL('https://shlok.upsanskritpratibhakhoj.com'),
  title: 'श्लोकसंधानम् | ShlokSandhanam',
  description:
    'Discover, search, read, and listen to a large collection of Sanskrit shlokas from classical literature.',
  keywords: [
    'Sanskrit shlokas',
    'ShlokSandhanam',
    'Sanskrit search',
    'Shloka database',
    'Sanskrit antakshari',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://shlok.upsanskritpratibhakhoj.com',
    title: 'श्लोकसंधानम् | ShlokSandhanam',
    description:
      'Explore a searchable Sanskrit shloka library with detailed entries and audio for selected verses.',
    siteName: 'ShlokSandhanam',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'श्लोकसंधानम् | ShlokSandhanam',
    description:
      'Explore a searchable Sanskrit shloka library with detailed entries and audio for selected verses.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const totalCount = getTotalShlokaCount();

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white border-b border-orange-100 py-3 sm:py-4 px-4 sm:px-6 shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-saffron rounded-lg flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
                  <span className="devanagari text-xl sm:text-2xl font-bold">श</span>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight devanagari">
                    श्लोकसंधानम्
                  </h1>
                  <p className="text-[10px] sm:text-xs text-saffron font-bold tracking-widest uppercase hidden sm:block">
                    Sanskrit Shloka Explorer
                  </p>
                </div>
              </Link>

              <nav className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/"
                  className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors px-2 py-1"
                >
                  Home
                </Link>
                <Link
                  href="/typing-guide"
                  className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors px-2 py-1"
                >
                  Typing Guide
                </Link>
                <Link
                  href="/explore"
                  className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all bg-saffron text-white shadow-md"
                >
                  Explore Now
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

          <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-12">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()} <span className="devanagari">श्लोकसंधानम्</span> |
                {' '}Sanskrit Shloka Explorer
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {totalCount.toLocaleString('en-US')} shlokas from classical Sanskrit literature
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Made by <span className="text-saffron">Jagdanand Jha</span> and{' '}
                <span className="text-saffron">Jayesh Krishna</span>
              </p>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}

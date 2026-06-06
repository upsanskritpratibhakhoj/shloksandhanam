import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAudioUrl } from '@/data/shlokaAudioDatabase';
import { SHLOKA_DATABASE } from '@/data/shlokaDatabase';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const index = Number.parseInt(id, 10);
  const entry = SHLOKA_DATABASE[index];

  if (!entry) {
    return {};
  }

  const cleanExcerpt =
    entry.text.length > 150 ? `${entry.text.substring(0, 147)}...` : entry.text;

  return {
    title: `Shloka #${index + 1} | ShlokSandhanam`,
    description: `Read this Sanskrit shloka entry: "${cleanExcerpt}"`,
    alternates: {
      canonical: `/shlokas/${index}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    },
  };
}

export async function generateStaticParams() {
  return SHLOKA_DATABASE.map((_, index) => ({
    id: index.toString(),
  }));
}

export default async function ShlokaPage({ params }: PageProps) {
  const { id } = await params;
  const index = Number.parseInt(id, 10);
  const entry = SHLOKA_DATABASE[index];

  if (!entry) {
    notFound();
  }

  const audioUrl = getAudioUrl(entry.text);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `Sanskrit Shloka Entry #${index + 1}`,
    text: entry.text,
    identifier: `shloka-index-id-${index}`,
    publisher: {
      '@type': 'Organization',
      name: 'ShlokSandhanam',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-saffron font-semibold">
              Shloka Entry
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 devanagari">
              श्लोक विवरण
            </h1>
            <p className="text-sm text-gray-500 mt-2">Reference #{index + 1}</p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-orange-50 text-orange-700 font-semibold hover:bg-orange-100 transition-colors"
          >
            Search More Shlokas
          </Link>
        </div>

        <article className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-5">
            <h2 className="text-lg font-semibold">Full Shloka</h2>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <section className="bg-orange-50 rounded-2xl p-6 border-l-4 border-saffron">
              <p className="devanagari text-xl sm:text-2xl text-gray-800 leading-relaxed whitespace-pre-line text-center">
                {entry.text}
              </p>
            </section>

            <section className="grid gap-4">
              <div className="rounded-2xl border border-orange-200 bg-white p-5 shadow-sm">
                <div className="mb-5 flex items-center gap-3 border-b border-orange-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-saffron">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-slate-700">
                      Listen to Shloka
                    </h3>
                    <p className="text-xs text-slate-500">Audio recitation</p>
                  </div>
                </div>
                {audioUrl ? (
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <audio controls className="w-full">
                      <source src={audioUrl} />
                      Your browser does not support audio playback.
                    </audio>
                  </div>
                ) : (
                  <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                    Audio is not available for this shloka yet.
                  </p>
                )}
              </div>

              <div className="rounded-2xl border-2 border-orange-200 bg-white p-5 text-center">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500">
                  Next Character
                </h3>
                <Link href="/explore" className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-saffron text-white shadow-lg">
                  <span className="devanagari text-4xl font-bold">{entry.nextChar}</span>
                </Link>
              </div>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}

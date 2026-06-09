import Link from 'next/link';
import { getTotalShlokaCount } from '@/services/shlokaSearchService';
import NotificationPopup from '../components/NotificationPopup'; // Adjust import path if needed

export default function HomePage() {
  const totalCount = getTotalShlokaCount();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ShlokSandhanam',
    alternateName: 'श्लोकसंधानम्',
    url: 'https://shlok.upsanskritpratibhakhoj.com',
    description:
      'A searchable Sanskrit shloka archive for reading, learning, and discovery.',
    inLanguage: ['sa', 'en'],
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://shlok.upsanskritpratibhakhoj.com/explore?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Render the Client-Side Popup */}
      <NotificationPopup />

      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12 animate-fadeIn px-4 relative z-10">
        <section className="text-center space-y-4 sm:space-y-6 py-6 sm:py-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="text-gray-900 block mb-2 devanagari">संस्कृत श्लोक संग्रह</span>
            <span className="text-saffron block">Sanskrit Shloka Database</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed devanagari">
            {totalCount.toLocaleString('hi-IN')} से अधिक संस्कृत श्लोकों का विशाल संग्रह।
            खोजें, पढ़ें और सीखें।
          </p>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            Explore over {totalCount.toLocaleString('en-US')} Sanskrit shlokas from classical
            literature. Search, read, and learn.
          </p>
          <div className="flex justify-center pt-4">
            <Link
              href="/explore"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-saffron text-white rounded-xl font-bold text-base sm:text-lg shadow-xl hover:scale-105 transition-all"
            >
              Start Exploring
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-10">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-orange-50">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
              <span className="text-saffron">📚</span> विशेषताएँ
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex gap-3 text-sm sm:text-base text-gray-600">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-saffron flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  ✓
                </span>
                {totalCount.toLocaleString('hi-IN')}+ प्रामाणिक संस्कृत श्लोक
              </li>
              <li className="flex gap-3 text-sm sm:text-base text-gray-600">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-saffron flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  ✓
                </span>
                तीव्र और सटीक खोज सुविधा
              </li>
              <li className="flex gap-3 text-sm sm:text-base text-gray-600">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-saffron flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  ✓
                </span>
                देवनागरी लिपि में पूर्ण समर्थन
              </li>
              <li className="flex gap-3 text-sm sm:text-base text-gray-600">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-saffron flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  ✓
                </span>
                प्रत्येक श्लोक का विस्तृत विवरण
              </li>
            </ul>
          </div>

          <div className="bg-saffron p-6 sm:p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">संग्रह स्रोत</h3>
              <div className="space-y-3 sm:space-y-4 opacity-95 devanagari">
                <p className="font-medium text-sm sm:text-base">रघुवंशम्</p>
                <p className="font-medium text-sm sm:text-base">कुमारसम्भवम्</p>
                <p className="font-medium text-sm sm:text-base">मेघदूतम्</p>
                <p className="font-medium text-sm sm:text-base">नैषधीयचरितम्</p>
                <p className="font-medium text-sm sm:text-base">किरातार्जुनीयम्</p>
                <p className="font-medium text-sm sm:text-base">और अधिक...</p>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from 'react';
import SearchInterface from './components/SearchInterface';
import { getTotalShlokaCount } from './services/shlokaSearchService';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'search'>('home');
  const totalCount = getTotalShlokaCount();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white border-b border-orange-100 py-3 sm:py-4 px-4 sm:px-6 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-saffron rounded-lg flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
              <span className="devanagari text-xl sm:text-2xl font-bold">श</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">श्लोकसंधानम्</h1>
              <p className="text-[10px] sm:text-xs text-saffron font-bold tracking-widest uppercase hidden sm:block">Sanskrit Shloka Explorer</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-2 sm:gap-6">
            <button 
              onClick={() => setView('home')}
              className={`text-xs sm:text-sm font-semibold transition-colors hidden sm:block ${view === 'home' ? 'text-orange-600' : 'text-gray-500 hover:text-orange-600'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setView('search')}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                view === 'search' 
                ? 'bg-saffron text-white shadow-md' 
                : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
              }`}
            >
              Explore Now
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {view === 'home' && (
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12 animate-fadeIn">
            <section className="text-center space-y-4 sm:space-y-6 py-6 sm:py-10 px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                <span className="text-gray-900 block mb-2">संस्कृत श्लोक संग्रह</span>
                <span className="text-saffron block">Sanskrit Shloka Database</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
                {totalCount.toLocaleString('hi-IN')} से अधिक संस्कृत श्लोकों का विशाल संग्रह। खोजें, पढ़ें और सीखें।
              </p>
              <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
                Explore over {totalCount.toLocaleString('en-US')} Sanskrit shlokas from classical literature. Search, read, and learn.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
                <button 
                  onClick={() => setView('search')}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-saffron text-white rounded-xl font-bold text-base sm:text-lg shadow-xl hover:scale-105 transition-all"
                >
                  Start Exploring
                </button>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-6 sm:pt-10">
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-orange-50">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="text-saffron">📚</span> विशेषताएं (Features)
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
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">संग्रह स्रोत (Sources)</h3>
                  <div className="space-y-3 sm:space-y-4 opacity-95">
                    <p className="font-medium text-sm sm:text-base">📖 रघुवंशम्</p>
                    <p className="font-medium text-sm sm:text-base">📖 कुमारसंभवम्</p>
                    <p className="font-medium text-sm sm:text-base">📖 मेघदूतम्</p>
                    <p className="font-medium text-sm sm:text-base">📖 नैषधीयचरितम्</p>
                    <p className="font-medium text-sm sm:text-base">📖 किरातार्जुनीयम्</p>
                    <p className="font-medium text-sm sm:text-base">📖 और अधिक...</p>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {view === 'search' && <SearchInterface />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} श्लोकसंधानम् | Sanskrit Shloka Explorer</p>
          <p className="text-xs text-gray-500 mt-2">
            {totalCount.toLocaleString('en-US')} shlokas from classical Sanskrit literature
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Made by <span className="text-saffron">Jagdanand Jha</span> and <span className="text-saffron">Jayesh Krishna</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

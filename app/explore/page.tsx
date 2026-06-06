import { Suspense } from 'react';
import SearchInterface from '@/components/SearchInterface';

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto py-16 text-center text-gray-500">Loading search...</div>}>
      <SearchInterface />
    </Suspense>
  );
}

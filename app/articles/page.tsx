'use client';

import { useState } from 'react';
import { ArticlesHeader } from '@/components/articles/ArticlesHeader';
import { ArticlesList } from '@/components/articles/ArticlesList';
import { FullArticleView } from '@/components/articles/FullArticleView';
import { useArticles } from '@/hooks/use-articles';
import { Article } from '@/types/article';
import { Loader2 } from 'lucide-react';

export default function ArticlesPage() {
  const { articles, loading, error, refetch } = useArticles();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2 text-lg">Loading articles...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Articles</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (selectedArticle) {
    return (
      <div className="container mx-auto px-4 py-12">
        <FullArticleView
          article={selectedArticle}
          onBack={() => setSelectedArticle(null)}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <ArticlesHeader
        title="Latest Articles"
        description="Explore our collection of articles about sustainable fashion and the global clothing trade"
      />
      
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
          <p className="text-gray-600">Check back later for new content.</p>
        </div>
      ) : (
        <ArticlesList articles={articles} />
      )}
    </div>
  );
}

// Alternative version that handles article selection via URL params
export function ArticlesPageWithRouting() {
  const { articles, loading, error } = useArticles();
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const selectedArticle = selectedArticleId 
    ? articles.find(article => article.id === selectedArticleId) 
    : null;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2 text-lg">Loading articles...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Articles</h1>
          <p className="text-gray-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  if (selectedArticle) {
    return (
      <div className="container mx-auto px-4 py-12">
        <FullArticleView
          article={selectedArticle}
          onBack={() => setSelectedArticleId(null)}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <ArticlesHeader
        title="Latest Articles"
        description="Explore our collection of articles about sustainable fashion and the global clothing trade"
      />
      
      {articles.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
          <p className="text-gray-600">Check back later for new content.</p>
        </div>
      ) : (
        <ArticlesList articles={articles} />
      )}
    </div>
  );
}
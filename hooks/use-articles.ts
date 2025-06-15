import { useState, useEffect } from 'react';
import { Article } from '@/types/article';

interface UseArticlesResult {
  articles: Article[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useArticles(): UseArticlesResult {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/test-drupal?type=articles');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.articles) {
        setArticles(data.articles);
      } else {
        throw new Error(data.error || 'Failed to load articles');
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const refetch = () => {
    fetchArticles();
  };

  return {
    articles,
    loading,
    error,
    refetch,
  };
}

// Hook to fetch a single article by ID
export function useArticle(id: string): {
  article: Article | null;
  loading: boolean;
  error: string | null;
} {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        

        const response = await fetch('/api/test-drupal?type=articles');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.articles) {
          const foundArticle = data.articles.find((a: Article) => a.id === id);
          if (foundArticle) {
            setArticle(foundArticle);
          } else {
            throw new Error('Article not found');
          }
        } else {
          throw new Error(data.error || 'Failed to load article');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  return {
    article,
    loading,
    error,
  };
}
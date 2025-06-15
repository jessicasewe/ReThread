// app/articles/[id]/page.tsx
'use client';

import { useParams, useRouter } from "next/navigation";
import { useArticle } from "@/hooks/use-articles";
import { FullArticleView } from "@/components/articles/FullArticleView";
import { Loader2 } from "lucide-react";

export default function ArticleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;

  const { article, loading, error } = useArticle(articleId);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2 text-sm">Loading article...</span>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">Article Not Found</h2>
        <p className="text-gray-600">We couldn’t find that article.</p>
        <button
          onClick={() => router.push("/articles")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <FullArticleView article={article} onBack={() => router.push("/articles")} />
    </div>
  );
}

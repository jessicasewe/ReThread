import { Article } from "@/types/article";
import Image from "next/image";

interface FullArticleViewProps {
  article: Article;
  onBack: () => void;
}

export function FullArticleView({ article, onBack }: FullArticleViewProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-10">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-green-700 hover:underline"
      >
        ← Back to articles
      </button>

      <h2 className="text-3xl font-bold mb-2">{article.title}</h2>
      <p className="text-sm text-muted-foreground mb-4">
        By {article.author} • {new Date(article.date).toLocaleDateString()}
      </p>

      <div className="relative w-full aspect-[16/9] mb-6 rounded overflow-hidden">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      <div
        className="text-gray-800 leading-relaxed prose"
        dangerouslySetInnerHTML={{ __html: article.content || article.description }}
      />
    </div>
  );
}

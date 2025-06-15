import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, TagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  onArticleSelect?: (article: Article) => void; // Optional callback for selection
}

export function ArticleCard({ article, onArticleSelect }: ArticleCardProps) {
  const handleReadMore = () => {
    if (onArticleSelect) {
      onArticleSelect(article);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="aspect-[16/9] relative">
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <CardHeader>
            <div className="flex justify-between items-start mb-3">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                {article.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 h-3 w-3" />
                {new Date(article.date).toLocaleDateString()}
              </div>
            </div>
            <CardTitle className="text-xl hover:text-green-700 transition-colors">
              {article.title}
            </CardTitle>
            <CardDescription className="line-clamp-3">
              {article.description}
            </CardDescription>
            
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {article.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                  >
                    <TagIcon className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
                {article.tags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{article.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </CardHeader>
          
          <CardFooter className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">By {article.author}</p>
            
            {onArticleSelect ? (
              <Button
                size="sm"
                onClick={handleReadMore}
                className="border border-green-600 bg-white text-green-700 hover:bg-green-50"
              >
                Read More
              </Button>
            ) : (
              <Link href={`/articles/${article.id}`}>
                <Button
                  size="sm"
                  className="border border-green-600 bg-white text-green-700 hover:bg-green-50"
                >
                  Read More
                </Button>
              </Link>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

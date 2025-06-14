import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden">
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
            <div className="flex justify-between items-start">
              <Badge className="text-green-800">{article.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 h-3 w-3" />
                {new Date(article.date).toLocaleDateString()}
              </div>
            </div>
            <CardTitle className="text-xl">{article.title}</CardTitle>
            <CardDescription>{article.description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">By {article.author}</p>
            <Link href={`/articles/${article.id}`}>
              <Button
                size="sm"
                className="border border-green-600 text-black hover:bg-green-100"
              >
                Read More
              </Button>
            </Link>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

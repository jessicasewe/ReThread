import { ArticlesHeader } from "@/components/articles/ArticlesHeader";
import { ArticlesList } from "@/components/articles/ArticlesList";
import { articles } from "@/data/articles";

export default function ArticlesPage() {
  return (
    <div className="container py-12 px-12">
      <div className="flex flex-col gap-6">
        <ArticlesHeader
          title="Articles"
          description="Read the latest insights on sustainable fashion and global clothing trade"
        />
        <ArticlesList articles={articles} />
      </div>
    </div>
  );
}

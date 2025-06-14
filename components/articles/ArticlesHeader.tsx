interface ArticlesHeaderProps {
  title: string;
  description: string;
}

export function ArticlesHeader({ title, description }: ArticlesHeaderProps) {
  return (
    <div className="mb-10 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-balance">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
}

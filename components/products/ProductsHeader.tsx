"use client";

interface ProductsHeaderProps {
  title?: string;
  description?: string;
  className?: string;
}

export function ProductsHeader({
  title = "Products",
  description = "Explore our sustainable fashion products and initiatives",
  className = "",
}: ProductsHeaderProps) {
  return (
    <div className={`mb-10 text-center ${className}`}>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-balance">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
}

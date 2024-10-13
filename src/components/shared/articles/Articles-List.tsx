import { cn } from '@/lib/utils.ts';
import { Article } from './Article';
import { Articles } from '@/types/articles';

interface ArticlesListProps {
  className?: string;
  articles: Articles;
}

export function ArticlesList({ className, articles }: ArticlesListProps) {
  return (
    <ul className={cn('flex flex-col gap-6', className)}>
      {articles!.articles.map((article) => (
        <Article key={article.slug} article={article} />
      ))}
    </ul>
  );
}

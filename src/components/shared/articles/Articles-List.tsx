import { cn } from '@/lib/utils.ts';
import { Article } from './Article';
import { Container } from '../Container';
import { Pagination } from '@/components/ui/pagination';
import { Articles } from '@/types/articles';

interface ArticlesListProps {
  className?: string;
  articles: Articles;
}

export function ArticlesList({ className, articles }: ArticlesListProps) {
  console.log(articles);
  return (
    <Container className="max-w-[938px]">
      <ul className={cn('flex flex-col gap-6', className)}>
        {articles!.articles.map((article) => (
          <Article key={article.slug} article={article} />
        ))}
      </ul>
      <Pagination></Pagination>
    </Container>
  );
}

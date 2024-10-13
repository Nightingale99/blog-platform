import { cn } from '@/lib/utils.ts';
import { Article } from './Article';
import { Container } from '../Container';
import { useGetArticlesQuery } from './articlesAPI';
import ShineBorder from '@/components/ui/shine-border';

interface ArticlesListProps {
  className?: string;
}

export function ArticlesList({ className }: ArticlesListProps) {
  const articles = useGetArticlesQuery({ limit: 10, offset: 9 });
  console.log(articles);
  return (
    <Container className="max-w-[938px]">
      <ul className={cn('flex flex-col gap-6', className)}>
        {articles.data?.articles.map((article) => (
          <ShineBorder color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}><Article key={article.slug} article={article} /></ShineBorder>
        ))}
      </ul>
    </Container>
  );
}

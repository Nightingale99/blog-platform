import { cn } from '@/lib/utils.ts';
import { Article } from './Article';
import { Container } from '../Container';
import { useGetArticlesQuery } from './articlesAPI';
import { Spinner } from '@/components/ui/spinner';
import { Pagination } from '@/components/ui/pagination';

interface ArticlesListProps {
  className?: string;
  limit?: number;
}

export function ArticlesList({ className, limit = 10 }: ArticlesListProps) {
  const {
    data: articles,
    isLoading,
    isError,
    isSuccess,
  } = useGetArticlesQuery({ limit: limit });
  console.log(articles);
  return (
    <Container className="max-w-[938px]">
      {isLoading && <Spinner size="large">Загрузка статей</Spinner>}
      {isError && 'Ошибка.'}
      {isSuccess && (
        <>
          <ul className={cn('flex flex-col gap-6', className)}>
            {articles!.articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </ul>
          <Pagination></Pagination>
        </>
      )}
    </Container>
  );
}

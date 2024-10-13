import { ArticlesList } from '@/components/shared/articles/Articles-List';
import { useGetArticlesQuery } from '@/components/shared/articles/articlesAPI';
import { Spinner } from '@/components/ui/spinner';

export function PostsPage() {
  const {
    data: articles,
    isLoading,
    isError,
    isSuccess,
  } = useGetArticlesQuery({ limit: 10 });
  return (
    <>
      {isLoading && <Spinner size="large">Загрузка статей</Spinner>}
      {isError && 'Ошибка.'}
      {isSuccess && <ArticlesList articles={articles} />}
    </>
  );
}

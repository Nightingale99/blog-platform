import { ArticlesList } from '@/components/shared/articles/Articles-List';
import { useGetArticlesQuery } from '@/components/shared/articles/articlesAPI';
import { Spinner } from '@/components/ui/spinner';
import { Container } from '@/components/shared/Container';
import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { Ban } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get('page')) || 1;

  const {
    data: articles,
    isLoading,
    isError,
    isSuccess,
  } = useGetArticlesQuery({ limit: 10, offset: pageNumber * 10 - 10 });

  const total = isSuccess ? articles.articlesCount : 0;

  return (
    <Container className="max-w-[938px]">
      {isLoading && <Spinner size="large">Загрузка статей</Spinner>}
      {isError && (
        <Alert variant="destructive" className="bg-popover">
          <Ban className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>Попробуйте еще раз чуть позднее</AlertDescription>
        </Alert>
      )}
      {isSuccess && (
        <>
          <ArticlesList articles={articles} />
          <Pagination
            className="my-6"
            total={total}
            pageSize={10}
            hideOnSinglePage
            defaultCurrent={1}
            align="center"
            showSizeChanger={false}
            showQuickJumper={false}
            current={Number(pageNumber)}
            onChange={(p) => setSearchParams({ page: String(p) })}
          />
        </>
      )}
    </Container>
  );
}

import { ArticleForm } from '@/components/shared/articles/ArticleForm/ArticleForm';
import { useGetOneArticleQuery } from '@/components/shared/articles/articlesAPI';
import { Container } from '@/components/shared/Container';
import { Spinner } from '@/components/ui/spinner';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export function ArticleEditPage() {
  const params = useParams();
  const token = localStorage.getItem('token');
  const {
    data: article,
    isLoading,
    isError,
  } = useGetOneArticleQuery({
    slug: params.slug!,
    token: token,
  });

  if (isError) {
    toast('Произошла ошибка при получении статьи');
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Container className="max-w-[938px] mb-4">
      {isLoading ? (
        <Spinner size="large">Загрузка статьи...</Spinner>
      ) : (
        <ArticleForm
          mode="edit"
          articleData={{
            article: article!.article,
            isLoading: isLoading,
          }}
        />
      )}
    </Container>
  );
}

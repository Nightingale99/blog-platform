import { Article } from '@/components/shared/articles/Article';
import { useGetOneArticleQuery } from '@/components/shared/articles/articlesAPI';
import { Container } from '@/components/shared/Container';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { CircleAlert } from 'lucide-react';
import { useParams } from 'react-router-dom';

export function OneArticlePage() {
  const { slug } = useParams();

  const token = localStorage.getItem('token');
  const { data, isLoading, isError, isSuccess } = useGetOneArticleQuery({
    slug: slug!,
    token: token,
  });
  return (
    <Container className="max-w-[938px] mb-4">
      {isLoading && <Spinner size="large">Загрузка статьи...</Spinner>}
      {isError && (
        <Alert variant="destructive" className="bg-popover">
          <CircleAlert className="h-4 w-4" />
          <AlertTitle>Такой статьи не существует</AlertTitle>
          <AlertDescription>
            Проверьте правильность введенной ссылки.
          </AlertDescription>
        </Alert>
      )}
      {isSuccess && <Article article={data!.article} full />}
    </Container>
  );
}

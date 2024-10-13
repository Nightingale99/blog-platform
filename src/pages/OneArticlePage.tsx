import { Article } from '@/components/shared/articles/Article';
import { useGetOneArticleQuery } from '@/components/shared/articles/articlesAPI';
import { Container } from '@/components/shared/Container';
import { Spinner } from '@/components/ui/spinner';
import { useParams } from 'react-router-dom';

export function OneArticlePage() {
  const { slug } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetOneArticleQuery(slug!);
  return (
    <Container className="max-w-[938px]">
      {isLoading && <Spinner size="large">Загрузка статьи...</Spinner>}
      {isError && 'Error!'}
      {isSuccess && <Article article={data!.article} full />}
    </Container>
  );
}

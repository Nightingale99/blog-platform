import { Article } from '@/components/shared/articles/Article';
import { useGetOneArticleQuery } from '@/components/shared/articles/articlesAPI';
import { Container } from '@/components/shared/Container';
import { useParams } from 'react-router-dom';

export function OneArticlePage() {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetOneArticleQuery(slug!);
  console.log(data);
  return (
    <Container className="max-w-[938px]">
      {isLoading && 'Loading...'}
      {isError && 'Error!'}
      {!isLoading && !isError && <Article article={data!.article} full />}
    </Container>
  );
}

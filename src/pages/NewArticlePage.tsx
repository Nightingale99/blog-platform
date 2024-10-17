import { Container } from '@/components/shared/Container';
import { ArticleForm } from '@/components/shared/articles/ArticleForm/ArticleForm';

export function NewArticlePage() {
  return (
    <Container className="max-w-[938px]">
      <ArticleForm />
    </Container>
  );
}

import { ArticleForm } from '@/components/shared/articles/ArticleForm/ArticleForm';
import { Container } from '@/components/shared/Container';

export function ArticleEditPage() {
  return (
    <Container className="max-w-[938px] mb-4">
      <ArticleForm mode="edit" />
    </Container>
  );
}

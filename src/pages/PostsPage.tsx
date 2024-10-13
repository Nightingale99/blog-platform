import { ArticlesList } from '@/components/shared/articles/Articles-List';

export function PostsPage() {
  return <ArticlesList limit={10} />;
}

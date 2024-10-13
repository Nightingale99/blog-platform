import { Layout } from '@/pages/Layout';
import { OneArticlePage } from '@/pages/OneArticlePage';
import { PostsPage } from '@/pages/PostsPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PostsPage />,
      },
      {
        path: 'articles/:slug',
        element: <OneArticlePage />,
      },
    ],
  },
]);

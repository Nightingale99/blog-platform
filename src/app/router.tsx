import { Layout } from '@/pages/Layout';
import { OneArticlePage } from '@/pages/OneArticlePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ArticlesPage />,
      },
      {
        path: 'articles',
        element: <ArticlesPage />,
      },
      {
        path: 'articles/:slug',
        element: <OneArticlePage />,
      },
    ],
  },
]);

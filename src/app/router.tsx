import { Layout } from '@/pages/Layout';
import { OneArticlePage } from '@/pages/OneArticlePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { createBrowserRouter } from 'react-router-dom';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AuthRequired } from './HOC/AuthRequired';
import { UnAuthRequired } from './HOC/UnAuthRequired';
import { NewArticlePage } from '@/pages/NewArticlePage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';

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
      {
        path: 'articles/:slug/edit',
        element: (
          <AuthRequired errorMessage="Редактировать статьи могут только зарегистрированные пользователи">
            <ArticleEditPage />
          </AuthRequired>
        ),
      },
      {
        path: 'sign-in',
        element: (
          <UnAuthRequired errorMessage="Вы авторизованы">
            <SignInPage />
          </UnAuthRequired>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <UnAuthRequired errorMessage="Вы зарегистрированы">
            <SignUpPage />
          </UnAuthRequired>
        ),
      },
      {
        path: 'profile',

        element: (
          <AuthRequired errorMessage="Редактировать профиль могут только зарегистрированные пользователи">
            <ProfilePage />
          </AuthRequired>
        ),
      },
      {
        path: '/new-article',
        element: (
          <AuthRequired errorMessage="Создавать статьи могут только зарегистрированные пользователи">
            <NewArticlePage />
          </AuthRequired>
        ),
      },
    ],
  },
]);

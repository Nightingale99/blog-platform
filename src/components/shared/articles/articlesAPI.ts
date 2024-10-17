import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Article, Articles } from '@/types/articles';
import { ArticleFormValues } from './ArticleForm/article-form-schema';

const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
  }),
  tagTypes: ['Article'],
  endpoints: (create) => ({
    getArticles: create.query<Articles, { limit?: number; offset?: number }>({
      query: ({ limit = 20, offset = 0 }) =>
        `articles?limit=${limit}&offset=${offset}`,
      providesTags: ['Article'],
    }),
    getOneArticle: create.query<{ article: Article }, string>({
      query: (slug) => `articles/${slug}`,
      providesTags: ['Article'],
    }),
    createArticle: create.mutation<
      { article: Article },
      { body: ArticleFormValues; token: string }
    >({
      query: ({ body, token }) => ({
        url: 'articles',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ article: body }),
      }),
      invalidatesTags: ['Article'],
    }),
    deleteArticle: create.mutation<void, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Article'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetOneArticleQuery,
  useCreateArticleMutation,
  useDeleteArticleMutation,
} = articlesApi;
export default articlesApi;

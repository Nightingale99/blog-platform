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
    getArticles: create.query<
      Articles,
      { limit?: number; offset?: number; token: string | null }
    >({
      query: ({ limit = 20, offset = 0, token = '' }) => ({
        url: `articles?limit=${limit}&offset=${offset}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['Article'],
    }),
    getOneArticle: create.query<
      { article: Article },
      { slug: string; token: string | null }
    >({
      query: ({ slug, token }) => ({
        url: `articles/${slug}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
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
    updateArticle: create.mutation<
      Article,
      { slug: string; body: ArticleFormValues; token: string }
    >({
      query: ({ slug, body, token }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ article: body }),
      }),
      invalidatesTags: ['Article'],
    }),
    favoriteArticle: create.mutation<Article, { slug: string; token: string }>({
      query: ({ slug, token }) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Article'],
    }),
    unFavoriteArticle: create.mutation<
      Article,
      { slug: string; token: string }
    >({
      query: ({ slug, token }) => ({
        url: `articles/${slug}/favorite`,
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
  useUpdateArticleMutation,
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
} = articlesApi;
export default articlesApi;

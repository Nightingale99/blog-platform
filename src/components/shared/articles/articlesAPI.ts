import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Articles } from '@/types/articles';
import type { Article } from '@/types/articles';

const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
  }),
  endpoints: (create) => ({
    getArticles: create.query<Articles, { limit?: number; offset?: number }>({
      query: ({ limit = 20, offset = 0 }) =>
        `articles?limit=${limit}&offset=${offset}`,
    }),
    getOneArticle: create.query<{ article: Article }, string>({
      query: (slug) => `articles/${slug}`,
    }),
  }),
});

export const { useGetArticlesQuery, useGetOneArticleQuery } = articlesApi;
export default articlesApi;

import { RegisterUserResponse, UserResponse } from '@/types/users';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  SignUpUserInput,
  SignInUserInput,
  UpdateProfileInput,
} from '@/types/users';
import { toast } from 'sonner';
const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
  }),
  tagTypes: ['User'],
  endpoints: (create) => ({
    signIn: create.mutation<UserResponse, SignInUserInput>({
      query: (body) => ({
        url: 'users/login',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body),
      }),
      transformResponse: (response: UserResponse) => {
        localStorage.setItem('token', response.user.token);
        return response;
      },
      invalidatesTags: ['User'],
    }),
    signUp: create.mutation<RegisterUserResponse, SignUpUserInput>({
      query: (body) => ({
        url: 'users',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body),
      }),
      transformResponse: (response: RegisterUserResponse) => {
        localStorage.setItem('token', response.user.token);
        return response;
      },
      invalidatesTags: ['User'],
    }),
    getCurrentUser: create.query<UserResponse, string>({
      query: (token) => ({
        url: '/user',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['User'],
    }),
    updateUser: create.mutation<
      UserResponse,
      UpdateProfileInput & { token: string }
    >({
      query: ({ user, token }) => ({
        url: '/user',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user: user }),
      }),
      invalidatesTags: ['User'],
      transformResponse: (response: UserResponse) => {
        toast('Профиль обновлен');
        return response;
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} = userApi;
export default userApi;

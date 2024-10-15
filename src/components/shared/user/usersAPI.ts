import { SignInFormInputs } from '@/pages/SignInPage';
import { NewUserResponse, UserResponse } from '@/types/users';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
  }),
  endpoints: (create) => ({
    signIn: create.mutation<UserResponse, { user: SignInFormInputs }>({
      query: (body) => ({
        url: 'users/login',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body),
      }),
    }),
    signUp: create.mutation<NewUserResponse, { user: SignInFormInputs }>({
      query: (body) => ({
        url: 'users',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body),
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = userApi;
export default userApi;

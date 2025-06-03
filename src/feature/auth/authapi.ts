import { createApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { generateFakeJWT } from '../../util/generateFakeJWT';
import type { User } from '../../types/types';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

const fakeBaseQuery: BaseQueryFn<
  { url: string; method: string; body: any },
  unknown,
  unknown
> = async ({ url, method, body }) => {
  if (url === '/login' && method === 'POST') {
    const res = await fetch('/user.json');
    const users: User[] = await res.json();
    const user = users.find(
      (u) => u.email === body.email && u.password === body.password
    );
    if (user) {
      const token = generateFakeJWT(user);
      return { data: { token } };
    }
    return { error: { status: 401, data: 'Invalid credentials' } };
  }

  return { error: { status: 404, data: 'Not implemented' } };
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials
      })
    })
  })
});

export const { useLoginMutation } = authApi;

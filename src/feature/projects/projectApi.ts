import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Project } from '../../types/types';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => 'projects.json'
    })
  })
});

export const { useGetProjectsQuery } = projectApi;

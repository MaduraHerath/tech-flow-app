// src/features/project/projectApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Project } from '../../types/types';

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Project'], // enable caching/tagging for refetch
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => 'projects.json', // mock source for now
      providesTags: ['Project'],
    }),

    deleteProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `projects/${id}`, // expects DELETE /projects/:id
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useDeleteProjectMutation,
} = projectApi;

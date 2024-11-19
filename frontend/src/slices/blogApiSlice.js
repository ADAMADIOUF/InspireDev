// postApiSlice.js
import {  BLOGS_URL, UPLOAD_URL } from '../constants'
import { apiSlice } from './apiSlice'

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (searchTerm = '') => ({
        url: `${BLOGS_URL}?title=${searchTerm}`, // Send search query to filter posts
      }),
      providesTags: ['Blog'],
    }),

    getPostById: builder.query({
      query: (id) => `${BLOGS_URL}/${id}`,
    }),
    addPost: builder.mutation({
      query: (data) => ({
        url: BLOGS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Blog'],
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.blogId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${BLOGS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
    uploadPostImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUploadPostImageMutation,
  
} = postsApiSlice

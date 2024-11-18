// postApiSlice.js
import { BLOGS_URL, UPLOAD_URL } from '../constants'
import { apiSlice } from './apiSlice'



export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: BLOGS_URL,
        
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
      query: ({ id, ...data }) => ({
        url: `${BLOGS_URL}/${id}`,
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
    likePost: builder.mutation({
      query: (postId) => ({
        url: `${BLOGS_URL}/${postId}/like`,
        method: 'PUT',
      }),
    }),
    unlikePost: builder.mutation({
      query: (postId) => ({
        url: `${BLOGS_URL}/${postId}/unlike`,
        method: 'PUT',
      }),
      invalidatesTags: ['Posts'],
    }),
    addComment: builder.mutation({
      query: ({ postId, text }) => ({
        url: `${BLOGS_URL}/${postId}/comments`,
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: ['Posts'],
    }),
    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `${BLOGS_URL}/${postId}/comments/${commentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
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
  useLikePostMutation,
  useUnlikePostMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = postsApiSlice

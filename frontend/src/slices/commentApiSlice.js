import { BLOGS_COMMENT } from '../constants'
import { apiSlice } from './apiSlice'

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsByBlog: builder.query({
      query: (blogId) => `${BLOGS_COMMENT}/${blogId}`,
      providesTags: (result, error, blogId) =>
        result ? [{ type: 'Comment', id: blogId }] : [], // Provide a tag with blogId for cache invalidation
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: BLOGS_COMMENT, // POST /api/comments
        method: 'POST',
        body: data,
      }),
      // Invalidate the cached data for this blog to refetch the comments list after adding a new comment
      invalidatesTags: (result, error, { blogId }) => [
        { type: 'Comment', id: blogId },
      ],
    }),
    updateComment: builder.mutation({
      query: ({ commentId, content }) => ({
        url: `${BLOGS_COMMENT}/${commentId}`, // PUT /api/comments/:commentId
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: (result, error, { blogId }) => [
        { type: 'Comment', id: blogId },
      ],
    }),
    deleteComment: builder.mutation({
      query: ({ commentId, blogId, postOwnerId }) => ({
        url: `${BLOGS_COMMENT}/${commentId}/${blogId}`,
        method: 'DELETE',
        body: { postOwnerId }, // Send postOwnerId if needed
      }),
      invalidatesTags: (result, error, { blogId }) => [
        { type: 'Comment', id: blogId },
      ],
    }),
  }),
})

export const {
  useGetCommentsByBlogQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApiSlice

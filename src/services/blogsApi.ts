import { BlogPost } from "@/types/BlogPost";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:8081/api";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    getBlogs: builder.query<BlogPost[], void>({
      query: () => "/public/blogs",
      providesTags: ["Blogs"],
    }),

    getBlogById: builder.query<BlogPost, string>({
      query: (id) => `/public/blogs/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Blogs", id }],
    }),

    addBlog: builder.mutation<BlogPost, { body: FormData }>({
      query: ({ body }) => {
        return {
          url: "/blogs",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Blogs"],
    }),

    updateBlog: builder.mutation<BlogPost, { id: number; body: FormData }>({
      query: ({id, body}) => {
        return {
          url: `/blogs/${id}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Blogs", id }],
    }),

    deleteBlog: builder.mutation<void, string>({
      query: (id) => {
        return {
          url: `/blogs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;

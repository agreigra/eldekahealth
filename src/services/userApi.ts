import { User } from "@/types/User";
import { getToken } from "@/util/tokenUtil";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get API base URL from environment or use mock API
const isProduction = import.meta.env.PROD;
const API_URL = "http://localhost:8081/api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Users", id }],
    }),

    createUser: builder.mutation<User, Partial<User>>({
      query: (user) => {
          return {
            url: "/users",
            method: "POST",
            body: user,
          };
        },
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation<User, Partial<User> & { id: string }>({
      query: (user) => {
          return {
            url: `/users/${user.id}`,
            method: "PUT",
            body: user,
          };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Users", id }],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => {
          return {
            url: `/users/${id}`,
            method: "DELETE",
          };
      },
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;

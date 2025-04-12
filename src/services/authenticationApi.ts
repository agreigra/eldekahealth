import { User } from "@/types/User";
import { clearToken, getToken } from "@/util/tokenUtil";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user?: User;
  token: string;
}

// Get API base URL from environment or use mock API
const isProduction = import.meta.env.PROD;
const API_URL = "http://localhost:8081/api";

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      console.log("prepareHeaders token:", token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: credentials,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    register: builder.mutation<User, RegisterRequest>({
      query: (userData) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: userData,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<void, void>({
      query: () => {
        return {
          url: "/users/logout",
          method: "POST",
        };
      },
      invalidatesTags: ['Auth'],
    }),

    getCurrentUser: builder.query<User | null, void>({
      query: () => "/users/me",
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authenticationApi;

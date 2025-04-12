
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { medicalProducts, Product } from '@/data/products';

// Get API base URL from environment or use mock API
const isProduction = import.meta.env.PROD;
const API_URL = isProduction
  ? 'https://api.medicalsolutions.com/api/v1'  // Replace with your actual production API
  : '/api'; // For development with a proxy

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => {
        if (isProduction) {
          return '/products';
        }
        return '/products';
      },
      transformResponse: (response: Product[] | undefined) => {
        if (isProduction) return response as Product[];
        return medicalProducts;
      },
      providesTags: ['Products'],
    }),
    
    getProductById: builder.query<Product, string>({
      query: (id) => {
        if (isProduction) {
          return `/products/${id}`;
        }
        return `/products/${id}`;
      },
      transformResponse: (response: Product | undefined, meta, id) => {
        if (isProduction) return response as Product;
        
        const product = medicalProducts.find(p => p.id === id);
        if (!product) {
          throw new Error('Product not found');
        }
        return product;
      },
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
    
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => {
        if (isProduction) {
          return {
            url: '/products',
            method: 'POST',
            body: product,
          };
        }
        return {
          url: '/products',
          method: 'POST',
          body: product,
        };
      },
      transformResponse: (response: Product | undefined, meta, product) => {
        if (isProduction) return response as Product;
        
        return {
          ...product,
          id: Date.now().toString(),
        } as Product;
      },
      invalidatesTags: ['Products'],
    }),
    
    updateProduct: builder.mutation<Product, Partial<Product> & { id: string }>({
      query: (product) => {
        if (isProduction) {
          return {
            url: `/products/${product.id}`,
            method: 'PUT',
            body: product,
          };
        }
        return {
          url: `/products/${product.id}`,
          method: 'PUT',
          body: product,
        };
      },
      transformResponse: (response: Product | undefined, meta, product) => {
        if (isProduction) return response as Product;
        return product as Product;
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Products', id }],
    }),
    
    deleteProduct: builder.mutation<void, string>({
      query: (id) => {
        if (isProduction) {
          return {
            url: `/products/${id}`,
            method: 'DELETE',
          };
        }
        return {
          url: `/products/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Products'],
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productsApi;

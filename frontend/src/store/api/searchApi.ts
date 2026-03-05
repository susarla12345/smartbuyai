import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  AISearchRequest,
  AISearchResponse,
  GenerateAffiliateLinkRequest,
  GenerateAffiliateLinkResponse,
} from '@shared/types';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Search'],
  endpoints: (builder) => ({
    aiSearch: builder.mutation<AISearchResponse, AISearchRequest>({
      query: (body) => ({
        url: '/ai-search',
        method: 'POST',
        body,
      }),
    }),
    generateAffiliateLink: builder.mutation<
      GenerateAffiliateLinkResponse,
      GenerateAffiliateLinkRequest
    >({
      query: (body) => ({
        url: '/generate-affiliate-link',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useAiSearchMutation, useGenerateAffiliateLinkMutation } = searchApi;

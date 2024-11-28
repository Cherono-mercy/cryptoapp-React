import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
    'x-rapidapi-key': '562a8bb8e1msh730d374aebe20dap153c17jsn94f8df3a2cdc',
    'x-rapidapi-host': 'cryptocurrency-news2.p.rapidapi.com'
  };


  const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com';

  const createRequest = (url) => ({ url, headers: cryptoNewsHeaders});

  export const cryptoNewsApi = createApi ({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: (count) => createRequest(`/v1/cryptodaily?limit=${count}`),
        })
    })
})

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;
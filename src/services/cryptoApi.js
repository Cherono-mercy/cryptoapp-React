import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    'x-rapidapi-key': '562a8bb8e1msh730d374aebe20dap153c17jsn94f8df3a2cdc',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

export const cryptoApi = createApi ({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: (uuid) => createRequest(`/coin/${uuid}`),
        }),
        getCryptoHistory: builder.query({
            query: ({uuid, timePeriod}) => createRequest(`coin/${uuid}/history?timePeriod=${timePeriod}`)

        })
    })
})

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} = cryptoApi;
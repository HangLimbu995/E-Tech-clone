import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {BASE_URL} from '../constant'

const baseQuery = fetchBaseQuery({ baseurl: BASE_URL })

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', "Users", 'Catagory', "Order"],
    endpoints: () => ({})

})
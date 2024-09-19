import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import favoritesReducer from '../redux/features/favorites/favoriteSlice'
import cartReducer from "./features/cart/cartSlice";
import shopReducer from './features/shop/shopSlice'
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";

const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        favorites: favoritesReducer,
        cart: cartReducer,
        shop: shopReducer,
    },

    preloadedState: {
        favorites: initialFavorites
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

setupListeners(store.dispatch)

export default store;
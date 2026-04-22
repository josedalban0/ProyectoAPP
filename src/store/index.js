import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { shopApi } from '../services/shopService';
import { authApi } from '../services/authService'; // Nuevo
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice'; // Nuevo

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer, // Nuevo
    cart: cartReducer,
    auth: authReducer, // Nuevo
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware, authApi.middleware), // Agregamos el nuevo middleware
});

setupListeners(store.dispatch);
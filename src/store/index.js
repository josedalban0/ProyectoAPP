import { configureStore } from '@reduxjs/toolkit';
import { shopApi } from '../services/shopService';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});
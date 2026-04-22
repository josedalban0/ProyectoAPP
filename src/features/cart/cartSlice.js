import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const itemExists = state.items.find((item) => item.id === action.payload.id);
      if (itemExists) {
        itemExists.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    removeItem: (state, action) => {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (itemToRemove) {
        state.total -= itemToRemove.price * itemToRemove.quantity;
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
  },
});


export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
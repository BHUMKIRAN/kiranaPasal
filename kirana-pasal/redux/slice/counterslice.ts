import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  quantities: {
    [productId: string]: number;
  };
}

const initialState: CounterState = {
  quantities: {},
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.quantities[productId] =
        (state.quantities[productId] || 0) + 1;
    },

    decrement: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (state.quantities[productId] > 0) {
        state.quantities[productId] -= 1;
      }
    },

    setQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      state.quantities[productId] = quantity;
    },
  },
});

export const { increment, decrement, setQuantity } =
  counterSlice.actions;

export default counterSlice.reducer;

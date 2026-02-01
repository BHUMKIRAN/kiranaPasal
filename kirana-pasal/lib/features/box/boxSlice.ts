import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  height: number;
  width: number;
}

const initialState: CounterState = {
  height: 0,
  width: 0,
};  

const lengthSlice = createSlice({
  name: "length",
  initialState,
  reducers: {
    increaseHeight: (state ,  action : PayloadAction) => {
      state.height += 10;
    },
    decreaseHeight: (state ,  action : PayloadAction) => {
      if (state.height > 0) {
        state.height -= 5;
      }
    },
    increaseWidth: (state ,  action : PayloadAction) => {
      state.width += 10;
    },
    decreaseWidth: (state ,  action : PayloadAction) => {
      if (state.width > 0) {
        state.width -= 5;
      }
    },
  },
});

export const {
  increaseHeight,
  decreaseHeight,
  increaseWidth,
  decreaseWidth,
} = lengthSlice.actions;

export default lengthSlice.reducer;

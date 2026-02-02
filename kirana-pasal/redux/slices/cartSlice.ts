import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action: PayloadAction<CartItem>)=>{
            const existing = state.items.find((item=>item.id=== action.payload.id))

            if(existing){
                existing.quantity += 1;
            } else {
                state.items.push({...action.payload, quantity:1})
            }
        },

        removeCart:(state , action: PayloadAction<CartItem>)=>{
            state.items = state.items.filter((item)=> item.id !== action.payload)
        },

        clearCart: (state)=>{
            state.items = []
        },
    },
})

export const { addToCart , removeCart , clearCart } = cartSlice.actions
export default cartSlice.reducer
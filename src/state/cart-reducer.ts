import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'cart',
    initialState: {
        totalPrise: 0,
        items: [],
    } as initialStateType,
    reducers: {
        addPizza(state, action: PayloadAction<{ index: number }>) { /* Типизиурем Action как PayloadAction */
            state.items.push(action.payload.index);
        },
        removePizza(state, action: PayloadAction<{ id: number }>) {
            state.items = state.items.filter(el => el.id !== action.payload.id);
        },
        clearCart(state, action: PayloadAction) {
            state.items = [];
        },
    },
});

// Создаем Reducer с помощью slice
export const cartReducer = slice.reducer;

// Создаем Actions с помощью slice
export const { addPizza, removePizza, clearCart } = slice.actions;


// types
type initialStateType = {
    totalPrise: number
    items: any[]
}
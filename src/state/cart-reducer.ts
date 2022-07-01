import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddPizzaType } from '../components/PizzaBlock';


// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'cart',
    initialState: {
        totalPrise: 0,
        items: [],
    } as initialStateType,
    reducers: {
        addPizza(state, action: PayloadAction<{ item: AddPizzaType }>) { /* Типизиурем Action как PayloadAction */

            const findItem = state.items.find(p => p.id === action.payload.item.id);

            if (findItem) {
                findItem[`t${action.payload.item.type}s${action.payload.item.size}`]++;
                findItem.count++
            } else {
                state.items.push({ ...action.payload.item,
                    t0s26: 0,
                    t0s30: 0,
                    t0s40: 0,
                    t1s26: 0,
                    t1s30: 0,
                    t1s40: 0,
                    [`t${action.payload.item.type}s${action.payload.item.size}`]: 1,
                    count: 1 },);
            }

            state.totalPrise += action.payload.item.price;
        },
        removePizza(state, action: PayloadAction<{ id: number }>) {
            state.items = state.items.filter(el => el.id !== action.payload.id);
        },
        increaseTypePizza(state, action: PayloadAction<{ id: number, changeType: string, price: number }>) {
            state.items.find(el => el.id === action.payload.id)[action.payload.changeType]++;
            state.items.find(el => el.id === action.payload.id)['count']++;
            state.totalPrise += action.payload.price;
        },
        decreaseTypePizza(state, action: PayloadAction<{ id: number, changeType: string, price: number }>) {
            state.items.find(el => el.id === action.payload.id)[action.payload.changeType]--;
            state.items.find(el => el.id === action.payload.id)['count']--;
            state.totalPrise -= action.payload.price;
        },
        clearCart(state) {
            state.items = [];
            state.totalPrise = 0;
        },
    },
});

// Создаем Reducer с помощью slice
export const cartReducer = slice.reducer;

// Создаем Actions с помощью slice
export const { addPizza, removePizza, clearCart, increaseTypePizza, decreaseTypePizza } = slice.actions;


// types
type initialStateType = {
    totalPrise: number
    items: Array<AddPizzaType & any>
}
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'pageCount',
    initialState: {
        pageCount: 0,
    } as initialStateType,
    reducers: {
        setPageCountAC(state, action: PayloadAction<{ count: number }>) { /* Типизиурем Action как PayloadAction */
            state.pageCount = action.payload.count;
        },
    },
});

// Создаем Reducer с помощью slice
export const pageCountReducer = slice.reducer;

// Создаем Actions с помощью slice
export const { setPageCountAC, } = slice.actions;


// types
type initialStateType = {
    pageCount: number
}
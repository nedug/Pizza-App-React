import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'app',
    initialState: {
        isLoading: true,
    } as initialStateType,
    reducers: {
        setIsLoadingAC(state, action: PayloadAction<{ IsLoading: boolean }>) { /* Типизиурем Action как PayloadAction */
            state.isLoading = action.payload.IsLoading;
        },
    },
});

// Создаем Reducer с помощью slice
export const appReducer = slice.reducer;

// Создаем Actions с помощью slice
export const { setIsLoadingAC, } = slice.actions;


// types
type initialStateType = {
    isLoading: boolean
}
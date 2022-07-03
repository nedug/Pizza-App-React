import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../api/API';
import { setIsLoadingAC } from './app-reducer';
import { PizzaType } from '../components/PizzaBlock';


// createAsyncThunk
export const setPizzasTC = createAsyncThunk(
    'pizza/setPizzas',
    async (param: { categoriesId: number, currentPage: number, searchValue: string, searchSort: string },
           { dispatch, rejectWithValue }) => {
        try {
            dispatch(setIsLoadingAC({ IsLoading: true }));
            const { data } = await API.getAllPizzasWithFilter(
                param.categoriesId, param.currentPage,
                param.searchValue, param.searchSort
            );
            return { data };
        } catch (error: any) {
            return rejectWithValue(error);
        } finally {
            dispatch(setIsLoadingAC({ IsLoading: false }));
        }
    });

// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'pizza',
    initialState: {
        pizzas: [],
    } as initialStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setPizzasTC.fulfilled, (state, action) => {
            state.pizzas = action.payload.data;
        });
    },
});

// Создаем Reducer с помощью slice
export const pizzaReducer = slice.reducer;


// types
type initialStateType = {
    pizzas: PizzaType[]
}
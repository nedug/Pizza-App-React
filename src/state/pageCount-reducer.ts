import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../api/API';
import { setIsLoadingAC } from './app-reducer';


// createAsyncThunk
export const setPageCountTC = createAsyncThunk(
    'pageCount/setPageCount',
    async (categoriesId: number, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await API.getAllPizzasWithCateg(categoriesId);
            return { count: Math.ceil(data.length / 4) };
        } catch (error: any) {
            return rejectWithValue(error);
        }
    });

// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'pageCount',
    initialState: {
        pageCount: 0,
    } as initialStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setPageCountTC.fulfilled, (state, action) => {
            state.pageCount = action.payload.count;
        });
    },
});

// Создаем Reducer с помощью slice
export const pageCountReducer = slice.reducer;


// types
type initialStateType = {
    pageCount: number
}
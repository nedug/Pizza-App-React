import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'filterPizzas',
    initialState: {
        searchValue: '',
        categories: 0,
        sortType: 0,
        currentPage: 1
    } as initialStateType,
    reducers: {
        setSearchValuedAC(state, action: PayloadAction<{ value: string }>) { /* Типизиурем Action как PayloadAction */
            state.searchValue = action.payload.value;
        },
        setCategoriesIdAC(state, action: PayloadAction<{ index: number }>) {
            state.categories = action.payload.index;
        },
        setSortTypeAC(state, action: PayloadAction<{ index: number }>) {
            state.sortType = action.payload.index;
        },
        setCurrentPageAC(state, action: PayloadAction<{ currentPage: number }>) {
            state.currentPage = action.payload.currentPage;
        },
        setFilterParams(state, action: PayloadAction<{ currentPage: string, categoriesId: string, searchSort: number }>) {
            state.currentPage = Number(action.payload.currentPage);
            state.categories = Number(action.payload.categoriesId);
            state.sortType = action.payload.searchSort;
        },
    },
});

// Создаем Reducer с помощью slice
export const filterReducer = slice.reducer;

// Создаем Actions с помощью slice
export const { setSearchValuedAC, setCategoriesIdAC, setSortTypeAC, setCurrentPageAC, setFilterParams } = slice.actions;


// types
type initialStateType = {
    searchValue: string
    categories: number
    sortType: number
    currentPage: number
}

export type setFilterParamsActionsType = {
    currentPage: string
    categoriesId: string
    searchSort: number
}
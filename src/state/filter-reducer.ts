import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// createAsyncThunk
// export const initializeAppTC = createAsyncThunk(
//     'app/initializeApp',
//     async (param, { dispatch, rejectWithValue }) => {
//         try {
//             dispatch(setStatusAC({ status: RequestStatus.loading }));
//             const { data } = await authAPI.me();
//             if (data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC({ isLoggedIn: true }));
//                 dispatch(setStatusAC({ status: RequestStatus.succeeded }));
//             } else {
//                 handleServerAppError(data, dispatch);
//                 return rejectWithValue({});
//             }
//         } catch (error: any) {
//             handleServerNetworkError(error, dispatch);
//             return rejectWithValue(error);
//         }
//     });

// объект slice для создания Actions и Reducer
const slice = createSlice({
    name: 'filterPizzas',
    initialState: {
        categories: 0,
        sortType: 0,
        currentPage: 1
    } as initialStateType,
    reducers: {
        setCategoriesIdAC(state, action: PayloadAction<{ index: number }>) { /* Типизиурем Action как PayloadAction */
            state.categories = action.payload.index;
        },
        setSortTypeAC(state, action: PayloadAction<{ index: number }>) {
            state.sortType = action.payload.index;
        },
        setCurrentPageAC(state, action: PayloadAction<{ currentPage: number }>) {
            state.currentPage = action.payload.currentPage;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(initializeAppTC.fulfilled, (state) => {
    //         state.isInitialized = true;
    //     });
    // },
});

// Создаем Reducer с помощью slice
export const filterReducer = slice.reducer;

// Создаем Actions с помощью slice
export const { setCategoriesIdAC, setSortTypeAC, setCurrentPageAC } = slice.actions;


// types
export type initialStateType = {
    categories: number
    sortType: number
    currentPage : number
}
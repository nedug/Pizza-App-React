import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { filterReducer } from './filter-reducer';


const rootReducer = combineReducers({
    filter: filterReducer,
});

// Redux Toolkit
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// types
export type AppRootStateType = ReturnType<typeof rootReducer> /* for rootReducer */
type RootState = ReturnType<typeof store.getState>  /* for useSelector */
type AppDispatch = typeof store.dispatch /* for useDispatch */

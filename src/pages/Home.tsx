import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { SkeletonPizza } from '../components/SkeletonPizza';
import { PizzaBlock } from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';
import { useAppDispatch, useAppSelector } from '../state/store';
import {
    setCategoriesIdAC,
    setCurrentPageAC,
    setFilterParams,
    setFilterParamsActionsType,
    setSortTypeAC
} from '../state/filter-reducer';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setPageCountTC } from '../state/pageCount-reducer';
import { fetchPizzasTC } from '../state/pizzas-reducer';


export const Home = () => {

    const isSearchParams = useRef(false);
    const isMounted = useRef(false);

    const sortBy = useMemo(() => ['rating', 'price', 'name'], []);

    const categoriesId = useAppSelector(state => state.filter.categories);
    const sortType = useAppSelector(state => state.filter.sortType);
    const currentPage = useAppSelector(state => state.filter.currentPage);
    const isLoading = useAppSelector(state => state.app.isLoading);
    const pageCount = useAppSelector(state => state.pageCount.pageCount);
    const pizzas = useAppSelector(state => state.pizza.pizzas);
    const searchValue = useAppSelector(state => state.filter.searchValue);

    const dispatch = useAppDispatch();
    const navigate = useNavigate(); /* Аналог useHistory */

    const [searchSort, setSearchSort] = useState('rating');

    const clickCategoriesIdHandler = useCallback((index: number) => {
        dispatch(setCategoriesIdAC({ index }));
        dispatch(setCurrentPageAC({ currentPage: 1 }));
    }, [dispatch]);
    const clickSortIdHandler =  useCallback((index: number) => {
        dispatch(setSortTypeAC({ index }));
        setSearchSort(sortBy[index]);
    }, [dispatch, sortBy]);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));/* Забираем параметры из URL */
            const indexSort = sortBy.findIndex((el) => el === params.searchSort);

            setSearchSort(sortBy[indexSort]);

            dispatch(setFilterParams({ ...params, searchSort: indexSort } as setFilterParamsActionsType));
            isSearchParams.current = true;
        }
    }, [dispatch, sortBy]);


    useEffect(() => {
        dispatch(setPageCountTC(categoriesId));
    }, [categoriesId, dispatch]);

    useEffect(() => {
        if (/*window.location.search*/ !isSearchParams.current) {
            dispatch(fetchPizzasTC({ categoriesId, currentPage, searchValue, searchSort }));
        }
        isSearchParams.current = false;
    }, [categoriesId, searchSort, searchValue, currentPage, dispatch]);

    useEffect(() => { /* Для объединения search параметров */
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoriesId,
                currentPage,
                searchSort: sortBy[sortType],
            });

            navigate(`?${queryString}`); /* Перемещение по указанномму URL */
        }
        isMounted.current = true;
    }, [categoriesId, searchSort, currentPage, navigate, sortType, sortBy]);


    const isPizzas = pizzas.length > 0
        ? pizzas.map(p => <PizzaBlock key={p.id} pizza={p} />)
        : <h2 style={{ color: 'red' }}>У нас нет таких пицц... <div>Измените параметры поиска</div></h2>


    return (
        <>
            <div className="content__top">
                <Categories
                    categoriesId={categoriesId}
                    callback={clickCategoriesIdHandler}
                />
                <Sort
                    sortType={sortType}
                    callback={clickSortIdHandler}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ?
                        [...new Array(3)].map((_, i) =>
                            <SkeletonPizza key={i} />)
                        :
                        isPizzas
                }
            </div>
            {
                !searchValue &&
                <Pagination currentPage={currentPage} pageCount={pageCount} />
            }
        </>
    );
};
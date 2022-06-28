import React, { useContext, useEffect, useState } from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { SkeletonPizza } from '../components/SkeletonPizza';
import { PizzaBlock, PizzaType } from '../components/PizzaBlock';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { useAppDispatch, useAppSelector } from '../state/store';
import { setCategoriesIdAC, setSortTypeAC } from '../state/filter-reducer';


export const Home = () => {

    const sortBy = ['rating', 'price', 'name'];

    const [pizzas, setPizzas] = useState<PizzaType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const categoriesId = useAppSelector(state => state.filter.categories);
    const sortType = useAppSelector(state => state.filter.sortType);

    const dispatch = useAppDispatch();

    const [searchSort, setSearchSort] = useState('rating');

    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const { searchValue }: any = useContext(SearchContext);


    const clickCategoriesIdHandler = (index: number) => {
        dispatch(setCategoriesIdAC({ index }));

        setCurrentPage(1);
    };
    const clickSortIdHandler = (index: number) => {
        dispatch(setSortTypeAC({ index }));

        setSearchSort(sortBy[index]);
    };

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://62b7ffc9f4cb8d63df575778.mockapi.io/pizzas?${categoriesId > 0 ? `category=${categoriesId}` : ''}`)
            .then(res => res.json())
            .then(data => {
                setPageCount(Math.ceil(data.length / 4));
            })
    }, [categoriesId]);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://62b7ffc9f4cb8d63df575778.mockapi.io/pizzas?page=${currentPage}&limit=4&${searchValue.length > 0 ? `search=${searchValue}` : ''}${categoriesId > 0 ? `category=${categoriesId}` : ''}&sortBy=${searchSort}&order=${searchSort === 'rating' ? 'desc' : 'asc'}`)
            .then(res => res.json())
            .then(data => {
                setPizzas(data);
                setIsLoading(false);
            })
        // window.scrollTo(0, 0);
    }, [categoriesId, searchSort, searchValue, currentPage]);


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
                        pizzas.map(p =>
                            <PizzaBlock key={p.id} pizza={p} />)
                }
            </div>
            <Pagination currentPage={currentPage} pageCount={pageCount} setCurrentPage={setCurrentPage} />
        </>
    );
};
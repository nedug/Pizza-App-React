import React, { useEffect, useState } from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { SkeletonPizza } from '../components/SkeletonPizza';
import { PizzaBlock, PizzaType } from '../components/PizzaBlock';


export const Home = ({searchValue}: HomePropsType) => {

    const sortBy = ['rating', 'price', 'name'];

    console.log(searchValue);

    const [pizzas, setPizzas] = useState<PizzaType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [categoriesId, setCategoriesId] = useState(0);
    const [sortType, setSortType] = useState(0);

    const [searchSort, setSearchSort] = useState('rating');

    const clickCategoriesIdHandler = (index: number) => {
        setCategoriesId(index);
    };
    const clickSortIdHandler = (index: number) => {
        setSortType(index);
        setSearchSort(sortBy[index]);
    };

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://62b7ffc9f4cb8d63df575778.mockapi.io/pizzas?${searchValue.length > 0 ? `search=${searchValue}` : ''}${categoriesId > 0 ? `category=${categoriesId}` : ''}&sortBy=${searchSort}&order=${searchSort === 'rating' ? 'desc' : 'asc'}`)
            .then(res => res.json())
            .then(data => {
                setPizzas(data);
                setIsLoading(false);
            })
        window.scrollTo(0, 0);
    }, [categoriesId, searchSort, searchValue]);


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
                        [...new Array(6)].map((_, i) =>
                            <SkeletonPizza key={i} />)
                        :
                        pizzas.map(p =>
                            <PizzaBlock key={p.id} pizza={p} />)
                }
            </div>
        </>
    );
};


type HomePropsType = {
    searchValue: string
}
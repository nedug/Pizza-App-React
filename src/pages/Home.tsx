import React, { useEffect, useState } from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { SkeletonPizza } from '../components/SkeletonPizza';
import { PizzaBlock, PizzaType } from '../components/PizzaBlock';


export const Home = () => {

    const [pizzas, setPizzas] = useState<PizzaType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://62b7ffc9f4cb8d63df575778.mockapi.io/items')
            .then(res => res.json())
            .then(data => {
                setPizzas(data);
                setIsLoading(false);
            })
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
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
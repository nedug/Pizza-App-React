import React, { useEffect, useState } from 'react';
import './scss/app.scss';
import { Header } from './Header';
import { Categories } from './Categories';
import { Sort } from './Sort';
import { PizzaBlock, PizzaType } from './PizzaBlock';
import { SkeletonPizza } from './SkeletonPizza';


export const App = () => {

    const [pizzas, setPizzas] = useState<PizzaType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://62b7ffc9f4cb8d63df575778.mockapi.io/items')
            .then(res => res.json())
            .then(data => {
                setPizzas(data);
                setIsLoading(false);
            })
    }, []);


    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
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
                </div>
            </div>
        </div>
    )
};

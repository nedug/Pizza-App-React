import React, { useState } from 'react';

export const Categories = () => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые',];

    const [index, setIndex] = useState(0);

    const clickHandler = (index: number) => {
        setIndex(index);
    };

    return (
        <div className="categories">
            <ul>
                {categories.map((li, i) =>
                    <li key={i} className={index === i ? 'active' : ''} onClick={() => clickHandler(i)}>{li}</li>)
                }
            </ul>
        </div>
    );
};
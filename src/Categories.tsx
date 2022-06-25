import React, { useState } from 'react';

export const Categories = () => {
    const [index, setIndex] = useState(0);

    const clickHandler = (index: number) => {
        setIndex(index);
    };

    return (
        <div className="categories">
            <ul>
                <li className={index === 0 ? 'active' : ''} onClick={() => clickHandler(0)}>Все</li>
                <li className={index === 1 ? 'active' : ''} onClick={() => clickHandler(1)}>Мясные</li>
                <li className={index === 2 ? 'active' : ''} onClick={() => clickHandler(2)}>Вегетарианская</li>
                <li className={index === 3 ? 'active' : ''} onClick={() => clickHandler(3)}>Гриль</li>
                <li className={index === 4 ? 'active' : ''} onClick={() => clickHandler(4)}>Острые</li>
                <li className={index === 5 ? 'active' : ''} onClick={() => clickHandler(5)}>Закрытые</li>
            </ul>
        </div>
    );
};
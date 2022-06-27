import React from 'react';


export const Categories = ({categoriesId, callback}: CategoriesPropsType) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Курица', 'Острые', 'Закрытые',];

    const clickHandler = (index: number) => () => callback(index);


    return (
        <div className="categories">
            <ul>
                {categories.map((li, i) =>
                    <li key={i} className={categoriesId === i ? 'active' : ''} onClick={clickHandler(i)}>{li}</li>)
                }
            </ul>
        </div>
    );
};


type CategoriesPropsType = {
    categoriesId: number
    callback: (categoriesId: number) => void
}
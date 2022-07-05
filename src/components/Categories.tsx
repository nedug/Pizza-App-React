import React from 'react';


export const Categories = React.memo(({ categoriesId, callback }: CategoriesPropsType) => {

    // Хук показывает из за чего перерисовываетс компонент
    // useWhyDidYouUpdate('Categories', { categoriesId, callback });

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
});


type CategoriesPropsType = {
    categoriesId: number
    callback: (categoriesId: number) => void
}
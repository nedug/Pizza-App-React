import React, { ChangeEvent } from 'react';
import styles from './Search.module.scss';


export const Search = ({ searchValue, setSearchValue }: SearchPropsType) => {

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };
    const clickClearHandler = () => {
        setSearchValue('');
    };

    return (
        <div className={styles.root}>
            <input
                value={searchValue}
                className={styles.input}
                placeholder="Поиск пиццы..."
                onChange={changeInputHandler}
            />

            {searchValue &&
                <svg
                    onClick={clickClearHandler}
                    className={styles.clear}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>}
        </div>

    );
};


type SearchPropsType = {
    searchValue: string
    setSearchValue: (value: string) => void
}
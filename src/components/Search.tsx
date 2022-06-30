import React, { ChangeEvent, useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { SearchContext } from '../App';


export const Search = () => {

    const [input, setInput] = useState('');

    const { searchValue, setSearchValue }: any = useContext(SearchContext);

    const inputSearchRef = useRef<HTMLInputElement>(null!);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateDebounceInput = useCallback(debounce((value: string) => {
            setSearchValue(value);
        }, 500),
        []);
    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        updateDebounceInput(e.target.value);
    };
    const clickClearHandler = () => {
        setInput('');
        setSearchValue('');
        inputSearchRef.current.focus();
    };

    return (
        <div className={styles.root}>
            <input
                ref={inputSearchRef}
                value={input}
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
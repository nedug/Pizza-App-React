import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import { setCurrentPageAC } from '../state/filter-reducer';
import { useAppDispatch } from '../state/store';


export const Pagination = ({ currentPage, pageCount }: PaginationPropsType) => {

    const dispatch = useAppDispatch();

    let className;
    if (currentPage === 1 && pageCount === 1) {
        className = `${styles.root} ${styles.first} ${styles.last}`
    } else if (currentPage === 1) {
        className = `${styles.root} ${styles.first} `
    } else if (currentPage === pageCount) {
        className = `${styles.root} ${styles.last} `
    } else {
        className = `${styles.root}`
    }


    return (
        <ReactPaginate
            className={className}
            breakLabel="..."
            nextLabel={'>'}
            previousLabel="<"
            onPageChange={(event) => dispatch(setCurrentPageAC({ currentPage: event.selected + 1 }))}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            forcePage={currentPage - 1}
        />
    );
};


type PaginationPropsType = {
    currentPage: number
    pageCount: number
}
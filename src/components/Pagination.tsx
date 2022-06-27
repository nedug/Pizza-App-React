import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';


export const Pagination = ({ currentPage, setCurrentPage, pageCount }: PaginationPropsType) => {
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
            onPageChange={(event) => setCurrentPage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            forcePage={currentPage - 1}
        />
    );
};


type PaginationPropsType = {
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    pageCount: number
}
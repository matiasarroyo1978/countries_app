import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ perPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / perPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (pageNumber) => {
    if (pageNumber === 'prev') {
      paginate(currentPage - 1);
    } else if (pageNumber === 'next') {
      paginate(currentPage + 1);
    } else {
      paginate(pageNumber);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => handleClick('prev')}
      >
        prev
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => handleClick(number)}
          className={currentPage === number ? styles.active : ''}
        >
          {number}
        </button>
      ))}
      <button
        disabled={currentPage === pageNumbers.length}
        onClick={() => handleClick('next')}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;

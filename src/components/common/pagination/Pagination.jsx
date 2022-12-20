import React, { useState } from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ pageSize, totalItemsCount, currentPage, onPageChanged, portionSize = 10 }) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [positionNumber, setPositionNumber] = useState(1);
    const leftPortionPageNumber = (positionNumber - 1 ) * portionSize + 1;
    const rightPortionPageNumber = positionNumber  * portionSize ;

    return (
        <div>
            {positionNumber > 1 && <button onClick={()=> setPositionNumber(positionNumber - 1)}>Prev</button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((page) => {
                    return <span key={page}
                                 onClick={() => onPageChanged(page)}
                                 className={currentPage === page ? styles.selectedPage : undefined}>{page}</span>;
                })}

            {portionCount > positionNumber && <button onClick={()=> setPositionNumber(positionNumber + 1)}>Next</button>}
        </div>
    );
};

export default Pagination;
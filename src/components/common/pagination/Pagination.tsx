import React, { useState } from 'react';
// @ts-ignore
import styles from './Pagination.module.css';
import { PaginationProps } from '../../../models/types-components';

const Pagination: React.FC<PaginationProps> = ({
                                                   pageSize, totalItemsCount, currentPage,
                                                   onPageChanged, portionSize = 10
                                               }: PaginationProps) => {
    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages: number[] = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [positionNumber, setPositionNumber] = useState<number>(1);
    const leftPortionPageNumber = (positionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = positionNumber * portionSize;

    return (
        <div>
            {positionNumber > 1 && <button onClick={() => setPositionNumber(positionNumber - 1)}>Prev</button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((page) => {
                    return <span key={page}
                                 onClick={() => onPageChanged(page)}
                                 className={currentPage === page ? styles.selectedPage : undefined}>{page}</span>;
                })}

            {portionCount > positionNumber && <button onClick={() => setPositionNumber(positionNumber + 1)}>Next</button>}
        </div>
    );
};

export default Pagination;
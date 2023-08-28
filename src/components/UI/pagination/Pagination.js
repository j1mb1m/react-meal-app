import React from 'react'
import './Pagination.css'
import { useState } from 'react';
import { useEffect } from 'react';

export const Pagination = ({ totalPages, page, changePage }) => {

    const pageNumbers = [];
    const count = Math.min(5, totalPages);
    const [visiblePages, setVisiblePages] = useState({ prev: 0, next: Math.min(count, totalPages) });

    useEffect(() => {
        setVisiblePages({ prev: visiblePages.prev, next: Math.min(visiblePages.prev + count, totalPages) });
    }, [totalPages]// eslint-disable-line
    )

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const slidePages = (number) => {

        if (totalPages - visiblePages.next < number) number = totalPages - visiblePages.next;

        if (visiblePages.prev + number < 0) number = -visiblePages.prev;
        setVisiblePages({ prev: visiblePages.prev + number, next: Math.min(visiblePages.next + number, totalPages) });
    }

    return (
        <div className='pagination'>
            <ul className='page-wrapper'>
                <li onClick={() => slidePages(-count)}> &laquo;
                </li>
                {
                    pageNumbers.slice(visiblePages.prev, visiblePages.next).map(number =>
                        <li key={number} className={page === number ? 'page active' : 'page'} onClick={() => {
                            changePage(number);
                        }}>
                            {number}
                        </li>
                    )
                }
                <li onClick={() => slidePages(count)}> &raquo;
                </li>
            </ul>

        </div >
    )

}

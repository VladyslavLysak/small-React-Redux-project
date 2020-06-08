import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ companiesPerPage, totalCompanies, paginate, location }) => {
    const allPageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCompanies / companiesPerPage); i++) {
        allPageNumbers.push(i);
    }

    const query = new URLSearchParams(location.search);
    let currentPage = query.get("page") ? Number(query.get("page")) : 1;
    let pageNumbers = new Set();

    if (allPageNumbers.length > 6) {
        pageNumbers.add(allPageNumbers[0]);

        if (currentPage === allPageNumbers[0]) {
            pageNumbers.add(allPageNumbers[1]);
            pageNumbers.add(allPageNumbers[2]);
        } else if (currentPage === allPageNumbers[allPageNumbers.length - 1]) {
            pageNumbers.add(allPageNumbers[allPageNumbers.length - 3]);
            pageNumbers.add(allPageNumbers[allPageNumbers.length - 2]);
        } else {
            pageNumbers.add(allPageNumbers[currentPage - 2]);
            pageNumbers.add(allPageNumbers[currentPage - 1]);
            pageNumbers.add(allPageNumbers[currentPage]);
        }

        pageNumbers.add(allPageNumbers[allPageNumbers.length - 1]);
    } else {
        pageNumbers = new Set(allPageNumbers);
    }

    return (
        <nav>
            <ul className='pagination center'>
                {[...pageNumbers].map(number => {
                    query.set("page", number)
                    return (
                        <li key={number} className='page-item'>
                            <Link
                                to={`${location.pathname}` + `?${query.toString()}`} replace
                                onClick={() => paginate(number)}
                                className='page-link'
                            >
                                {number}
                            </Link>
                        </li>
                    )
                }
                )}
            </ul>
        </nav>
    )
};

export default Pagination;
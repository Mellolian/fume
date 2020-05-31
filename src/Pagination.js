import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];
  let pageLimit = Math.floor(totalPosts/postsPerPage);
  if (Math.floor(totalPosts/postsPerPage) > 5) {
    console.log(Math.ceil(totalPosts/postsPerPage))
    pageLimit = 5;
  }
    
  if (currentPage-pageLimit < 0) {
  for (let i = 1; i <= (currentPage+pageLimit); i++) {
    pageNumbers.push(i);
  }
} else {
  for (let i = (currentPage-pageLimit+1); i <= (currentPage+pageLimit); i++) {
    pageNumbers.push(i);
  }
  }
  

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav> 
  );
};

export default Pagination;
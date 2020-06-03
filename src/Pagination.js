import React from "react";

function Pagination(props) {
  let pageNumbers = [];
  let pageLimit;
  let firstPage;
  let lastPage;
  //   if (Math.ceil(props.totalPosts / props.postsPerPage)) {
  pageLimit = 3;
  if (props.currentPage <= pageLimit) {
    pageNumbers = [];
    firstPage = 1;
    console.log(props.currentPage);
    if (
      Math.ceil(props.totalPosts / props.postsPerPage) >
      props.currentPage + pageLimit
    ) {
      lastPage = props.currentPage + pageLimit;
      console.log(lastPage);
    } else {
      lastPage = Math.ceil(props.totalPosts / props.postsPerPage);
    }
    console.log(firstPage);
    console.log(lastPage);
    for (let i = firstPage; i <= lastPage; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers = [];
    firstPage = props.currentPage - pageLimit;
    if (
      Math.ceil(props.totalPosts / props.postsPerPage) >
      props.currentPage + pageLimit
    ) {
      lastPage = props.currentPage + pageLimit;
      console.log(lastPage);
    } else {
      lastPage = Math.ceil(props.totalPosts / props.postsPerPage);
    }
    console.log(props.currentPage);
    console.log(firstPage);
    console.log(lastPage);
    for (let i = firstPage; i <= lastPage; i++) {
      pageNumbers.push(i);
    }
  }

  console.log(pageNumbers);
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              name={number}
              onClick={props.paginate}
              href="!#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;

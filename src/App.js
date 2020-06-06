import React from "react";
import CustomCard from "./Card";
import data from "./data.json";
import CustomNavbar from "./Navbar";
import Pagination from "./Pagination";
import { Grid } from "@material-ui/core";
import Sidenav from "./Sidenav";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      info: data,
      page: [],
      activePage: 1,
      itemsPerPage: 8,
      filteredInfo: data,
      brands: [],
      query: "",
      isSelected: {},
      isLoading: 'Load more'
    };

    this.sortByPrice = this.sortByPrice.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByDiscount = this.sortByDiscount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.renderNewPage = this.renderNewPage.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.setFilteredInfo = this.setFilteredInfo.bind(this);
    this.handleAll = this.handleAll.bind(this);
    this.loadMore = this.loadMore.bind(this)
  }

  componentDidMount() {
    this.setState({
      page: data
        .filter((card) => card.price < card.rawPrice)
        .slice(0, this.state.itemsPerPage),
    });

    this.setState({
      filters: [],
    });
  }

  sortByPrice() {
    let array = this.state.info;
    array.sort((a, b) => a.price - b.price);
    this.setState((array) => {
      return {
        filteredInfo: array.info,
      };
    });
    this.setState({
      activePage: 1,
      page: this.state.filteredInfo.slice(
        (this.state.activePage - 1) * this.state.itemsPerPage,
        this.state.activePage * this.state.itemsPerPage
      ),
    });
  }

  sortByDiscount() {
    let array = this.state.info;
    array.sort((a, b) => 1 - b.price / b.rawPrice - (1 - a.price / a.rawPrice));
    this.setState((array) => {
      return {
        filteredInfo: array.info,
      };
    });
    this.setState({
      activePage: 1,
      page: this.state.filteredInfo.slice(
        (this.state.activePage - 1) * this.state.itemsPerPage,
        this.state.activePage * this.state.itemsPerPage
      ),
    });
  }

  sortByName() {
    let array = this.state.info;
    console.log(array);
    array.sort((a, b) => {
      if (a.brand.toLowerCase() < b.brand.toLowerCase()) return -1;
      if (a.brand.toLowerCase() > b.brand.toLowerCase()) return 1;
      return 0;
    });
    this.setState((array) => {
      return {
        filteredInfo: array.info,
      };
    });
    this.setState({
      activePage: 1,
      page: this.state.filteredInfo.slice(
        (this.state.activePage - 1) * this.state.itemsPerPage,
        this.state.activePage * this.state.itemsPerPage
      ),
    });
  }

  handleInputChange = (e) => {
    let query = "";

    if (e.target.value.length > 0) {
      console.log("handleInputChange");
      query = e.target.value;
      this.setState({
        query: e.target.value,
      });
    } else if (e.target.value == 0) {
      let query = "";
      this.setState({
        query: query,
      });
      console.log("handleInputChange");
      console.log(this.state.query);
    }
    return query;
  };

  handleCheckboxChange(event) {
    let label = event.target.name;
    let isSelected = this.state.isSelected;
    isSelected[label] = event.target.checked;
    this.setState({
      isSelected,
    });
    let validFilters = [];
    validFilters = Object.keys(this.state.isSelected).filter(
      (key) => this.state.isSelected[key]
    );
    console.log(validFilters);
    this.setState(
      {
        filters: validFilters,
      },
      () => console.log(this.state.filters)
    );

    return validFilters;
  }

  setFilteredInfo(filters) {
    let arrs = [];
    for (let i = 0; i < filters.length; i++) {
      arrs.push(data.filter((item) => item.brand === filters[i]));
    }
    arrs = arrs.flat();
    this.setState(
      {
        filteredInfo: arrs,
      },
      () => console.log(arrs)
    );
    return arrs;
  }

  handleAll(e) {
    console.clear();
    let filters = this.state.filters;
    let query = this.state.query;
    let arrs = this.state.filteredInfo;

    if (e.target.type === "checkbox") {
      console.log("checkbox");
      filters = this.handleCheckboxChange(e);
      this.setState(
        {
          filters: filters,
        },
        () => console.log(filters)
      );
    } else if (e.target.type === "text") {
      console.log("text");
      query = this.handleInputChange(e);
      console.log(query);
      this.setState({
        query: query,
      });
      console.log(query);
    }

    if (filters !== undefined && filters.length > 0 && query == "") {
      console.log("only filters");
      console.log(filters);
      arrs = this.setFilteredInfo(filters);
      this.setState(
        {
          filteredInfo: arrs,
          activePage: 1,
        },
        () => this.renderNewPage(this.state)
      );
    } else if (filters.length == 0 && query !== "") {
      console.log(filters);
      console.log("only query");
      console.log("query is " + query + " wtf?");
      arrs = data.filter(
        (piece) => piece.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
      console.log(arrs);
      this.setState(
        {
          filteredInfo: arrs,
          activePage: 1,
        },
        () => this.renderNewPage(this.state)
      );
    } else if ((filters.length == 0 || filters == undefined) && query == "") {
      arrs = data;
      console.log("blank result");
    } else if (filters.length > 0 && query.length > 0) {
      console.log("both filters and query");
      arrs = data.filter(
        (piece) => piece.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
      arrs = arrs.filter((item) => filters.includes(item.brand));
      this.setState(
        {
          filteredInfo: arrs,
        },
        () => this.renderNewPage(this.state)
      );
    }

    console.log("result is");
    console.log(arrs);

    if (arrs !== undefined && arrs.length > 0) {
      console.log(arrs);
      this.setState(
        {
          filteredInfo: arrs,
        },
        () => this.renderNewPage(this.state)
      );
    } else if (
      (filters == [] || filters == undefined) &&
      this.state.query.length === 0
    ) {
      console.log("clearing all filters");
      this.setState(
        {
          filteredInfo: data,
        },
        () => this.renderNewPage(this.state)
      );
    }
  }

  setFilters() {
    let validFilters = [];
    validFilters = Object.keys(this.state.isSelected).filter(
      (key) => this.state.isSelected[key]
    );
    this.setState({
      filters: validFilters,
    });
  }

  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber,
    });
  }

  renderNewPage(newState) {
    console.log(newState.filteredInfo);
    this.setState(
      {
        page: newState.filteredInfo
          .filter((card) => card.price < card.rawPrice)
          .slice(
            (newState.activePage - 1) * newState.itemsPerPage,
            newState.activePage * newState.itemsPerPage
          ),
      },
      () => console.log(this.state)
    );
  }

  setCurrentPage(event) {
    console.log(event.target.name);
    this.setState(
      {
        activePage: parseInt(event.target.name),
      },
      () => this.renderNewPage(this.state)
    );
  }

  loadMore (event) {
    let items = this.state.itemsPerPage  
    this.setState({itemsPerPage: items+ 8}, () => this.renderNewPage(this.state))
    console.log('loaded')
  }

  render() {
    return (
      <div className="App">
        <CustomNavbar
          info={this.state.filteredInfo}
          handleInputChange={this.handleAll}
        />

        <div className="container">
          <Sidenav
            info={this.state.info}
            handleCheckboxChange={this.handleAll}
            isSelected={this.state.isSelected}
          />{" "}
          <div className="cards">
            {this.state.page.length > 0 ? (
              <CustomCard info={this.state.page} />
            ) : (
              <h3 id="not-found">
                К сожалению, товаров соответствующих условиям не найдено.
              </h3>
            )}{" "}
            {this.state.filteredInfo.length > this.state.itemsPerPage ? (
              <button onClick={this.loadMore}>{this.state.isLoading}</button>
              // <Pagination
              //   postsPerPage={this.state.itemsPerPage}
              //   totalPosts={this.state.filteredInfo.length}
              //   paginate={this.setCurrentPage}
              //   currentPage={this.state.activePage}
              // />
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    )
    ;
  }
}

export default App;

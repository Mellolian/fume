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

    this.handleAll = this.handleAll.bind(this);
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
    let res;

    if (e.target.value.length > 0) {
      console.log("handleInputChange");
      console.log(e.target.value);
      this.setState({
        query: e.target.value,
      });
      res = this.state.info.filter(
        (item) =>
          item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      );
    } else if (e.target.value === 0) {
      console.log("handleInputChange");
      console.log(this.state.query);
      res = this.state.filteredInfo;
    }
    return res;
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
    this.setState({
      filters: validFilters,
    });
    return validFilters;
  }

  handleAll(e) {
    let filters = this.state.filters;
    let result = data;
    let res = this.state.info;
    let arrs = data;
    console.clear();

    if (e.target.type === "checkbox") {
      console.log("checkbox");
      filters = this.handleCheckboxChange(e);
      this.setState({
        filters: filters,
      });
      let temp = [];
      for (let i = 0; i < filters.length; i++) {
        temp.push(result.filter((item) => item.brand === filters[i]));
      }
      console.log(temp);
      arrs = temp.flat();
      this.setState({
        filteredInfo: arrs,
      });
    } else if (e.target.type === "text") {
      console.log("text");
      res = this.handleInputChange(e);
      this.setState({
        filteredInfo: res,
      });
      console.log(res);
    } else {
      console.log("ERROR");
    }

    if (filters.length > 0 && this.state.query.length === 0) {
      console.log("only filters");
      let temp = [];
      for (let i = 0; i < filters.length; i++) {
        temp.push(result.filter((item) => item.brand === filters[i]));
      }
      console.log(temp);
      arrs = temp.flat();
      this.setState({
        filteredInfo: arrs,
      });
    } else if (filters.length === 0 && this.state.query.length > 0) {
      console.log("only query");
      arrs = this.state.info.filter(
        (result) =>
          result.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !==
          -1
      );

      this.setState({
        filteredInfo: arrs,
        activePage: 1,
      });

      console.log(arrs);
    } else if (
      this.state.filters.length === 0 &&
      this.state.query.length === 0
    ) {
      arrs = data;
      console.log("blank result");
    } else if (this.state.filters.length > 0 && this.state.query.length > 0) {
      console.log("both filters and query");
      let temp = this.state.info.filter(
        (item) =>
          item.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1
      );
      arrs = temp.filter((item) => filters.includes(item.brand));
      this.setState({
        filteredInfo: arrs,
      });

      console.log("arrs is");
      console.log(arrs);
    }
    console.log("result is");
    console.log(arrs);

    if (arrs.length > 0) {
      console.log(arrs);
      this.setState(
        {
          filteredInfo: arrs,
        },
        () => this.renderNewPage(this.state)
      );
      console.log(this.state);
      this.renderNewPage(this.state);
    } else if (
      this.state.filters.length === 0 &&
      this.state.query.length === 0
    ) {
      console.log("clearing all filters");
      this.setState({
        filteredInfo: data,
      });
    }
    console.log(this.state);
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
    console.log(`active page is ${pageNumber}`);
    this.setState({
      activePage: pageNumber,
    });
  }

  renderNewPage(newState) {
    console.log(newState);
    this.setState(
      {
        page: newState.filteredInfo
          .filter((card) => card.price < card.rawPrice)
          .slice(
            (newState.activePage - 1) * newState.itemsPerPage,
            newState.activePage * newState.itemsPerPage
          ),
      },
      () =>
        this.setState({
          activePage: 1,
        })
    );
  }

  setCurrentPage(number) {
    this.setState({
      activePage: number,
    });
  }

  render() {
    const paginate = (pageNumber) => this.setCurrentPage(pageNumber);
    return (
      <div className="App">
        <CustomNavbar
          info={this.state.info}
          handleInputChange={this.handleAll}
        />{" "}
        <Sidenav
          info={this.state.info}
          handleCheckboxChange={this.handleAll}
          isSelected={this.state.isSelected}
        />{" "}
        <div className="main">
          {" "}
          <Grid container spacing={2} justify="space-evenly">
            <CustomCard info={this.state.page} />
          </Grid>{" "}
        </div>
        {this.state.filteredInfo.length > this.state.itemsPerPage ? (
          <Pagination
            postsPerPage={this.state.itemsPerPage}
            totalPosts={this.state.filteredInfo.length}
            paginate={paginate}
            currentPage={this.state.activePage}
          />
        ) : (
          <div />
        )}{" "}
      </div>
    );
  }
}

export default App;

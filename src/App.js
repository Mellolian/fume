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
        rawInfo: data,
      sortedInfo: data,
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
    this.renderNewPage = this.renderNewPage.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.setFilteredInfo = this.setFilteredInfo.bind(this);
    this.handleAll = this.handleAll.bind(this);
  }

  componentDidMount() {
    let initialSorting = new Promise((resolve, reject) => {
      this.sortByDiscount();
    });
    let initial = this.state.sortedInfo.filter((card) => card.price < card.rawPrice)
    .slice(0, this.state.itemsPerPage)

    initialSorting
      .then(
        this.setState({
          page: initial,
          filters: []})
      );
  }

  sortByPrice() {
    console.log("sorting...");
    let array = this.state.rawInfo;
    array.sort((a, b) => a.price - b.price);
    this.setState(
      {
        sortedInfo: array,
      },
      () =>
        this.setState(
          {
            activePage: 1,
            page: array.slice(
              (this.state.activePage - 1) * this.state.itemsPerPage,
              this.state.activePage * this.state.itemsPerPage
            ),
          },
          () => this.renderNewPage(this.state)
        )
    );
  }

  sortByDiscount() {
    console.log("sorting...");
    let array = this.state.rawInfo;
    array.sort((a, b) => 1 - b.price / b.rawPrice - (1 - a.price / a.rawPrice));
    this.setState(
      {
        sortedInfo: array,
      },
      () =>
        this.setState(
          {
            activePage: 1,
            page: array.slice(
              (this.state.activePage - 1) * this.state.itemsPerPage,
              this.state.activePage * this.state.itemsPerPage
            ),
          },
          () => this.renderNewPage(this.state)
        )
    );
  }

  sortByName() {
    console.log("sorting...");
    let array = this.state.rawInfo;
    array.sort((a, b) => {
      if (a.brand.toLowerCase() < b.brand.toLowerCase()) return -1;
      if (a.brand.toLowerCase() > b.brand.toLowerCase()) return 1;
      return 0;
    });
    this.setState(
      {
        sortedInfo: array,
      },
      () =>
        this.setState(
          {
            activePage: 1,
            page: array.slice(
              (this.state.activePage - 1) * this.state.itemsPerPage,
              this.state.activePage * this.state.itemsPerPage
            ),
          },
          () => this.renderNewPage(this.state)
        )
    );
  }

  handleInputChange = (e) => {
    let query = "";

    if (e.target.value.length > 0) {
      query = e.target.value;
      this.setState({
        query: e.target.value,
      });
    } else if (e.target.value == 0) {
      let query = "";
      this.setState({
        query: query,
      });
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

    this.setState({
      filters: validFilters,
    });

    return validFilters;
  }

  setFilteredInfo(filters) {
    let arrs = [];
    for (let i = 0; i < filters.length; i++) {
      arrs.push(this.state.sortedInfo.filter((item) => item.brand === filters[i]));
    }

    arrs = arrs.flat();
    this.setState({
      filteredInfo: arrs,
    });
    return arrs;
  }

  handleAll(e) {
    let filters = this.state.filters;
    let query = this.state.query;
    let arrs = this.state.sortedInfo;

    if (e.target.type === "checkbox") {
      filters = this.handleCheckboxChange(e);
      this.setState({
        filters: filters,
      });
    } else if (e.target.type === "text") {
      query = this.handleInputChange(e);

      this.setState({
        query: query,
      });
    }

    if (filters !== undefined && filters.length > 0 && query == "") {
      arrs = this.setFilteredInfo(filters);
      this.setState(
        {
          filteredInfo: arrs,
          activePage: 1,
        },
        () => this.renderNewPage(this.state)
      );
    } else if (filters.length == 0 && query !== "") {
      arrs = this.state.sortedInfo.filter(
        (piece) => piece.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
      this.setState(
        {
          filteredInfo: arrs,
          activePage: 1,
        },
        () => this.renderNewPage(this.state)
      );
    } else if ((filters.length == 0 || filters == undefined) && query == "") {
      arrs = this.state.sortedInfo;
    } else if (filters.length > 0 && query.length > 0) {
      arrs = this.state.sortedInfo.filter(
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

    if (arrs !== undefined && arrs.length > 0) {
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
      this.setState(
        {
          filteredInfo: this.state.sortedInfo,
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
      let arrs = [];
    newState.filteredInfo.length > 0 ? arrs = newState.filteredInfo : arrs = newState.sortedInfo
    this.setState({
      page: arrs
        .filter((card) => card.price < card.rawPrice)
        .slice(
          (newState.activePage - 1) * newState.itemsPerPage,
          newState.activePage * newState.itemsPerPage
        ),
    });
  }

  setCurrentPage(event) {
    this.setState(
      {
        activePage: parseInt(event.target.name),
      },
      () => this.renderNewPage(this.state)
    );
  }

  render() {
    const options = [
      { value: "price", label: "Цена" },
      { value: "name", label: "Название" },
      { value: "discount", label: "Скидка" },
    ];
    return (
      <div className="App">
        <CustomNavbar
          info={this.state.filteredInfo}
          handleInputChange={this.handleAll}
          setCurrentPage={this.setCurrentPage}
          sortByPrice={this.sortByPrice}
          sortByName={this.sortByName}
          sortByDiscount={this.sortByDiscount}
        />{" "}
        <Sidenav
          info={this.state.rawInfo}
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
            paginate={this.setCurrentPage}
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

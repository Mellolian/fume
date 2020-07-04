import React from "react";
import CustomCard from "./Card";
// import data from "./data.json";
import CustomNavbar from "./Navbar";
import Sidenav from "./Sidenav";
import "./App.css";

async function getData(url) {
  let response = await fetch(url);
  let catalogue = await response.json();
  return catalogue;
}

async function getMax(url) {
  let response = await fetch(url);
  let max = await response.text();
  return max;
}

const url = "https://fume-backend.herokuapp.com/";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      info: [],
      activePage: 1,
      brands: [],
      query: "",
      isSelected: {},
      filters: [],
      Url: "https://fume-backend.herokuapp.com/",
      isLoading: true,
    };

    // this.sortByPrice = this.sortByPrice.bind(this);
    // this.sortByName = this.sortByName.bind(this);
    // this.sortByDiscount = this.sortByDiscount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderNewPage = this.renderNewPage.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.getValidFilters = this.getValidFilters.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
  }

  async componentDidMount() {
    let data = await getData(url + "?&page=1");
    let brands = await getData(url + "brands/");
    let total = await getMax(url + "total");
    console.log(total);
    if (data.length < total) {
      this.setState({
        info: data,
        brands: brands,
        loadProducts: true,
        isLoading: false,
      });
    } else {
      this.setState({
        info: data,
        brands: brands,
        loadProducts: false,
        isLoading: false,
      });
    }
  }

  // sortByPrice() {
  //   let array = this.state.info;
  //   array.sort((a, b) => a.price - b.price);
  //   this.setState((array) => {
  //     return {
  //       filteredInfo: array.info,
  //     };
  //   });
  //   this.setState({
  //     activePage: 1,
  //     page: this.state.filteredInfo.slice(
  //       (this.state.activePage - 1) * this.state.itemsPerPage,
  //       this.state.activePage * this.state.itemsPerPage
  //     ),
  //   });
  // }

  // sortByDiscount() {
  //   let array = this.state.info;
  //   array.sort((a, b) => 1 - b.price / b.rawPrice - (1 - a.price / a.rawPrice));
  //   this.setState((array) => {
  //     return {
  //       filteredInfo: array.info,
  //     };
  //   });
  //   this.setState({
  //     activePage: 1,
  //     page: this.state.filteredInfo.slice(
  //       (this.state.activePage - 1) * this.state.itemsPerPage,
  //       this.state.activePage * this.state.itemsPerPage
  //     ),
  //   });
  // }

  // sortByName(array) {
  //   array.sort((a, b) => {
  //     if (a.brand.toLowerCase() < b.brand.toLowerCase()) return -1;
  //     if (a.brand.toLowerCase() > b.brand.toLowerCase()) return 1;
  //     return 0;
  //   });
  //   this.setState((array) => {
  //     return {
  //       filteredInfo: array.info,
  //     };
  //   });
  //   this.setState({
  //     activePage: 1,
  //     page: this.state.filteredInfo.slice(
  //       (this.state.activePage - 1) * this.state.itemsPerPage,
  //       this.state.activePage * this.state.itemsPerPage
  //     ),
  //   });
  // }

  async handleInputChange(e) {
    console.log("handleInput");
    let query = "";
    e.target.value ? (query = e.target.value) : (query = "");
    this.setState(
      {
        query: query,
      },
      () => this.applyFilters()
    );
  }

  async applyFilters() {
    let validFilters = [...this.state.filters];
    let query = this.state.query;
    let page = this.state.activePage;
    let arrs = [];
    let products = 0;
    let res = [];

    if (validFilters != 0) {
      res = arrs.concat(
        await getData(
          this.state.Url +
            "?&page=1" +
            "&filter=" +
            validFilters +
            (query ? "&query=" + query : "")
        )
      );
      arrs = res;
      products += parseInt(
        await getMax(
          this.state.Url +
            "total" +
            "?&filter=" +
            validFilters +
            (query ? "&query=" + query : "")
        )
      );
      console.log(products);
      console.log(res);
      // }

      console.log(arrs.length < products);
      this.setState({
        info: arrs,
        activePage: 1,
        loadProducts: arrs.length < products,
      });
    } else {
      arrs = await getData(
        this.state.Url + "?&page=1" + (query ? "&query=" + query : "")
      );
      products = await getMax(
        this.state.Url + "total" + (query ? "?&query=" + query : "")
      );
      console.log(products);
      console.log(arrs.length < products);
      console.log(arrs);
      this.setState({
        info: arrs,
        activePage: 1,
        filters: [],
        loadProducts: arrs.length < products,
      });
    }
  }

  getValidFilters() {
    let isSelected = this.state.isSelected;
    let validFilters = [];
    validFilters = Object.keys(isSelected).filter((key) => isSelected[key]);
    console.log(validFilters);
    this.setState(
      {
        filters: validFilters,
      },
      () => this.applyFilters()
    );
  }

  async handleCheckboxChange(event) {
    let label = event.target.name;
    let isSelected = this.state.isSelected;
    isSelected[label] = event.target.checked;
    this.setState({ isSelected }, () => this.getValidFilters());
  }

  renderNewPage(newState) {
    this.setState({
      newState,
    });
  }

  async loadMore() {
    // let arrs = [];
    let products;
    let res = [];
    let url = this.state.Url;
    let filters = this.state.filters;
    let query = this.state.query;

    console.log(filters);
    res = await getData(
      url +
        "?&page=" +
        (this.state.activePage + 1) +
        (query ? "&query=" + query : "") +
        (filters != 0 ? "&filter=" + filters : "")
    );
    console.log(res);
    console.log(query);
    console.log(filters);
    products = parseInt(
      await getMax(
        url +
          "total?" +
          (query ? "&query=" + query : "") +
          (filters != 0 ? "&filter=" + filters : "")
      )
    );
    console.log(products);
    this.setState(
      {
        info: res,
        activePage: this.state.activePage + 1,
        loadProducts: res.length < products,
      },
      () => this.renderNewPage(this.state)
    );
  }

  render() {
    return (
      <div className="App">
        <CustomNavbar
          info={this.state.info}
          handleInputChange={this.handleInputChange}
        />

        <div className="container">
          <Sidenav
            info={this.state.info}
            brands={this.state.brands}
            handleCheckboxChange={this.handleCheckboxChange}
            isSelected={this.state.isSelected}
          />
          <div className="cards">
            {this.state.info.length > 0 ? (
              <CustomCard info={this.state.info} />
            ) : this.state.isLoading ? (
              <h3 id="not-found">
                Загрузка... Если загрузка длится больше 5 секунд, пожалуйста,
                обновите страницу
              </h3>
            ) : (
              <h3 id="not-found">
                К сожалению, товаров соответствующих условиям не найдено.
              </h3>
            )}

            {this.state.loadProducts ? (
              <button className="btn" onClick={this.loadMore}>
                Показать еще
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

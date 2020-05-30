import React from 'react';
import CustomCard from './Card'
import data from './data.json'
import CustomNavbar from './Navbar'
import Pagination from 'react-js-pagination'
import {Grid} from '@material-ui/core';
import Sidenav from './Sidenav'
import './App.css'


class App extends React.Component {
  constructor() {
    super()
    this.state = {info : data, 
      page: [], 
      activePage: 1,
    itemsPerPage: 24,
  filteredInfo : data,
brands: [],
filters: []}
    this.sortByPrice = this.sortByPrice.bind(this)
    this.sortByName = this.sortByName.bind(this)
    this.sortByDiscount = this.sortByDiscount.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.renderNewPage = this.renderNewPage.bind(this)
}
  
  componentDidMount() {
    this.setState(
      {page: data.filter(
        card => card.price < card.rawPrice).slice(0, this.state.itemsPerPage)})}

      

    sortByPrice() {
    let array = this.state.info;
    array.sort((a, b) => a.price - b.price)
    this.setState((array) => {return { filteredInfo: array.info }})
    this.setState(
      { activePage: 1, page: this.state.filteredInfo.slice((this.state.activePage-1)*this.state.itemsPerPage, (this.state.activePage)*this.state.itemsPerPage) })
    }

    sortByDiscount() {
      let array = this.state.info;
      array.sort((a, b) => (1 - b.price/b.rawPrice) - (1- a.price/a.rawPrice) )
      this.setState((array) => {return { filteredInfo: array.info }})
      this.setState(
        { activePage: 1, page: this.state.filteredInfo.slice((this.state.activePage-1)*this.state.itemsPerPage, (this.state.activePage)*this.state.itemsPerPage) }
      )
    }
    
    sortByName() {
    let array = this.state.info;
    console.log(array)
    array.sort((a, b) => {
    if(a.brand.toLowerCase() < b.brand.toLowerCase()) return -1;
    if(a.brand.toLowerCase() > b.brand.toLowerCase()) return 1;
    return 0;
    })
    this.setState((array) => {return { filteredInfo: array.info }})
    this.setState(
      { activePage: 1, page: this.state.filteredInfo.slice((this.state.activePage-1)*this.state.itemsPerPage, (this.state.activePage)*this.state.itemsPerPage) }
    )
  }    

    handleInputChange = (e) => {
      this.setState({
        query: e.target.value, info: data
      }, () => {
          let res = this.state.info.filter(result => ((result.name).toLowerCase()).indexOf(this.state.query) !== -1);
          
          this.setState({filteredInfo: res}, () => this.setState({activePage: 1}))
          this.setState((state) => {return{page: this.state.filteredInfo.slice((this.state.activePage)*this.state.itemsPerPage, (this.state.activePage+1)*this.state.itemsPerPage)}}, () => this.handlePageChange(1))

      })
    }

    handleCheckboxChange = (e) => {

        e.preventDefault()
        console.log(e.target.value)
      this.setState((state) => {return{filters: state.filters.push(e.target.value)}})
      let res = []
      for (let i=0; i<this.state.filters.length; i++) {
        res.push(this.state.info.filter(item => item.brand === this.state.filters[i]))
      }
      console.log(res)
      this.setState({filteredInfo: res}, () => this.renderNewPage())
    }

    handlePageChange(pageNumber) {
      console.log(`active page is ${pageNumber}`);
      this.setState({activePage: pageNumber}, () => this.renderNewPage());    
    }

    renderNewPage() {
      this.setState(
        { page: this.state.filteredInfo
          .filter(card => card.price < card.rawPrice)
          .slice((this.state.activePage-1)*this.state.itemsPerPage, 
          (this.state.activePage)*this.state.itemsPerPage)}
      )
    }


  render() {
    
    return (
    <div className="App">
<CustomNavbar info={this.state.info} handleInputChange={this.handleInputChange} />
<Sidenav info={this.state.filteredInfo} handleCheckbox=
  {this.handleCheckboxChange.bind(this)} />
    <div className="main"><Grid container spacing={2}
        justify="space-evenly">      
          <CustomCard info={this.state.page} />      
            
        </Grid>
    </div>

({this.state.page.length > this.state.itemsPerPage ? <Pagination activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsPerPage}
          totalItemsCount={this.state.info.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}/>: <div/>  })
</div>
    )};
  }


export default App;


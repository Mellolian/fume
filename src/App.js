import React from 'react';
import CustomCard from './Card'
import data from './data.json'
import CustomNavbar from './Navbar'
import Pagination from './Pagination';
import {Grid} from '@material-ui/core';
import Sidenav from './Sidenav'
import './App.css'


class App extends React.Component {
  constructor() {
    super()
    this.state = {info : data, 
      page: [], 
      activePage: 1,
    itemsPerPage: 8,
  filteredInfo : data,
brands: [],
query : '',
isSelected : {},

}

    this.sortByPrice = this.sortByPrice.bind(this)
    this.sortByName = this.sortByName.bind(this)
    this.sortByDiscount = this.sortByDiscount.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.renderNewPage = this.renderNewPage.bind(this)
    this.setFilters = this.setFilters.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.setCurrentPage = this.setCurrentPage.bind(this)
}

  componentDidMount() {
    this.lst = new Set()
    this.setState(
      {page: data.filter(
        card => card.price < card.rawPrice).slice(
          0, this.state.itemsPerPage)})
          
      this.setState({filters: []})}

    
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
          this.setState((state) => {return{page: this.state.filteredInfo.slice((this.state.activePage)*this.state.itemsPerPage, (this.state.activePage+1)*this.state.itemsPerPage)}}, () => 
          { if (this.state.filters.length === 0) {
            this.renderNewPage()
          } else {
            this.setFilters()
          }
            })
      })
    }

    handleCheckboxChange(event, name) {
      // event.preventDefault()
      let isSelected = this.state.isSelected
      isSelected[name] = event.target.checked
      this.setState({isSelected}, () => this.setFilters())
    }
  

    setFilters() {
      let validFilters = []
      validFilters = Object.keys(this.state.isSelected).filter(key => this.state.isSelected[key])
      this.setState({filters: validFilters}, () => this.filterInfo())
              
    }
  

    filterInfo() {
      let arr = []
      console.log(this.state.filters)
      if (this.state.filters.length > 0) {
        for (let i=0; i<this.state.filters.length; i++) {        
          arr.push(this.state.filteredInfo.filter(item => item.brand.toLowerCase() === this.state.filters[i].toLowerCase())) 
          this.setState({filteredInfo:arr.flat()}, () => this.renderNewPage())
        }      
      } else {
        this.setState(
        { filteredInfo: this.state.info }, () => this.renderNewPage()
      )}}

    handlePageChange(pageNumber) {
      console.log(`active page is ${pageNumber}`);
      this.setState({activePage: pageNumber}, () => this.renderNewPage());    
    }

    renderNewPage() {
      this.setState(
        {page: this.state.filteredInfo
          .filter(card => card.price < card.rawPrice)
          .slice((this.state.activePage-1)*this.state.itemsPerPage, 
          (this.state.activePage)*this.state.itemsPerPage)}
      )
      this.setState({activePage: 1})
      console.log(this.state.page.length)
    }


    setCurrentPage(number){
      this.setState({activePage: number}, () => this.renderNewPage())
    }
    

  render() {
    const indexOfLastPost = this.state.activePage * this.state.itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.itemsPerPage;
    const currentPosts = this.state.filteredInfo.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    const paginate = pageNumber => this.setCurrentPage(pageNumber);
    return (
    <div className="App">
<CustomNavbar info={this.state.info} handleInputChange={this.handleInputChange} />
<Sidenav info={this.state.info} handleCheckboxChange=
  {this.handleCheckboxChange} isSelected={this.state.isSelected}/>
    <div className="main"><Grid container spacing={2}
        justify="space-evenly">      
          <CustomCard info={this.state.page} />      
            
        </Grid>
    </div>

{this.state.filteredInfo.length > this.state.itemsPerPage ? 
  <Pagination postsPerPage={this.state.itemsPerPage}
  totalPosts={this.state.filteredInfo.length}
  paginate={paginate}
  currentPage={this.state.activePage}/> : <div/>  }
</div>
    )};
  }


export default App;


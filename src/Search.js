import React, { Component } from 'react'
// import data from './letu.json'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: this.props.props.info
          };        
    }

  componentDidMount() {      
      let info = this.props.props
      this.setState({
          results: info              
        })
      }  
  
  render() {
    
    return (
      <form style={{width: '100%'}}>
        <input 
        className="form-control"
        type="text"
          placeholder="Поиск"
          // ref={input => {this.search = input}}
          onChange={this.props.handleInputChange}
        />
        <p>{this.state.query}</p>
      </form>
    )
  }
}

export default Search
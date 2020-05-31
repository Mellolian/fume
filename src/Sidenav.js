import React from 'react';

import Brands from './Brands'
import Checkbox from './Checkbox'

export default function Sidenav(props) {
let brr = Brands(props)
let arr = []
const listToDisplay = (props) => {
    Object.keys(Brands(props)).forEach(key => arr.push(<p key={key}><Checkbox label={key} handleCheckboxChange={props.handleCheckboxChange} isSelected={props.isSelected} length={brr[key].length} /></p>))
    return arr
  }

return (
<div className="sidenav">
  <form>
    <h5>БРЕНДЫ</h5>
        {listToDisplay(props)}
  </form>
</div>)
}
// export default function Sidenav(props) {
//   var items = Array.from(props.brands);
//   console.log(items);

// const Divs = () =>  {return items.map(item => <div key={item}>{item}</div>)};

//   // console.log(divs)
//   // items.length !== 0 ? (items.map(brand => items.push(
//   //   (
//   //     <div key={brand}>{brand}</div>
//   //   ))
//   // )) : <div />;
// return (<div className="sidenav">

// {/* <Button onClick={props.sortByPrice}>Сортировать по цене</Button>
// <Button onClick={props.sortByBrand}>Сортировать по алфавиту</Button>
// <Button onClick={props.sortByDiscount}>Сортировать по скидке</Button> */}


// {/* <label>
//   <input type="radio" name="Sorting" value="Price" onChange={props.sortByPrice} />
//   Цене
// </label>
// <br />
// <label>
//   <input type="radio" name="Sorting" value="Name" onChange={props.sortByName} />
//   Названию
// </label>
// <br />
// <label>
//   <input type="radio" name="Sorting" value="Discount" onChange={props.sortByDiscount} />
//   Скидке
// </label>
// <br /> */}
// </form>
// </div>)
// }

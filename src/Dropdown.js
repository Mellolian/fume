import React from 'react';
import { Dropdown } from 'react-bootstrap';

function CustomDropdown(props) {
    return (
    <Dropdown >
<Dropdown.Toggle variant="success" id="dropdown-basic">
  Сортировка
</Dropdown.Toggle>
<Dropdown.Menu>
  <Dropdown.Item onClick={props.sortByPrice}>Сортировать по цене</Dropdown.Item>
  <Dropdown.Item onClick={props.sortByBrand}>Сортировать по алфавиту</Dropdown.Item>
  <Dropdown.Item onClick={props.sortByDiscount}>Сортировать по скидке</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>)
}

export default CustomDropdown;
import React from "react";

function Checkbox(props) {

  return (
  <div className="form-check" key={props.label}>
    <label>
      <input
        type="checkbox"
        name={props.label}
        onChange={props.handleCheckboxChange}
        className="form-check-input"
      />
      {props.label} - {props.length}
    </label>    
  </div>
  )};

export default Checkbox;
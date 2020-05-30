import React from "react";

const Checkbox = ({ label, isSelected, onCheckboxChange, length }) => (
  <div className="form-check" key={label}>
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {label} - {length}
    </label>
  </div>
);

export default Checkbox;
import React from "react";
import Brands from "./Brands";
import Checkbox from "./Checkbox";

export default function Sidenav(props) {
  let arr = [];
  // const listToDisplay = Brands(props.brands)
  const listToDisplay = (props) => {
    Object.keys(Brands(props.brands)).forEach((key) =>
      arr.push(
        <p key={key}>
          <Checkbox
            label={key}
            handleCheckboxChange={props.handleCheckboxChange}
            isSelected={props.isSelected}
            length={Brands(props.brands)[key]}
          />
        </p>
      )
    );
    return arr;
  };

  return (
    <div className="sidenav">
      <form>
        <h5>БРЕНДЫ</h5>
        {listToDisplay(props)}
      </form>
    </div>
  );
}

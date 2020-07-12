import React from "react";

export default function Logo(props) {
  if (props.shop == "RiveGauche") {
    return (
      <img
        className="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/5/50/Riv_gosh_1.jpg"
        alt="Rive Gauche"
      />
    );
  } else if (props.shop == "Letu") {
    return (
      <img
        className="logo"
        src="https://upload.wikimedia.org/wikipedia/ru/f/f9/%D0%9B%D0%B5%D1%82%D1%83%D0%B0%D0%BB%D1%8C.jpg"
        alt="Letual"
      />
    );
  } else if (props.shop == "Sephora") {
    return (
      <img
        className="logo"
        src="https://m.buro247.ru/images/senina/sephora_logo_m.jpg"
        alt="Sephora"
      />
    );
  }
}

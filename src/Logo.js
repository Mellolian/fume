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
  } else if (props.shop == "NYX") {
    return (
      <img
        className="logo"
        src="https://res-5.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_120,w_120,f_auto,b_white,q_auto:eco/v1403242863/ljqlvughy8fz86c9j5ed.png"
        alt="NYX"
      />
    );
  }
}

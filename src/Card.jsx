import React from "react";
import TextTruncate from "react-text-truncate";

function CustomCard(props) {
  return (
    <>
      {props.info
        .filter((card) => card.price < card.rawPrice)
        .map((card) => (
          <div className="card" body={card.name} key={card.id}>
            <div className="card-image-wrap">
              <img className="product" alt={card.name} src={card.imageUrl} />
            </div>
            <p className="name">{card.name} </p>
            <div className="small">
              

              <div>
                <b className="price">{card.price} ₽ </b>
                <p className="raw-price">
                  <s>{card.rawPrice} ₽</s>
                </p>
                <snap className="discount">
                  <b>-{Math.floor((1 - card.price / card.rawPrice) * 100)}%</b>
                </snap>
                <a href={card.href} target="_blank">
                  <img
                    className="logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/50/Riv_gosh_1.jpg"
                    alt="Rive Gauche"
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default CustomCard;

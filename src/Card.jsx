import React from "react";
import Truncate from 'react-truncate';

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
            <p className="name"><Truncate lines={2} ellipsis={<span>.</span>}>
                {card.name}
            </Truncate> </p>
            <div className="small">
                <b className="price">{card.price} ₽ </b>
                <span className="raw-price">
                  <s>{card.rawPrice} ₽</s>
                </span>
                <snap className="discount">
                  <b>-{Math.floor((1 - card.price / card.rawPrice) * 100)}%</b>
                </snap>
                <a href={card.href} target="_blank" rel="noopener noreferrer">
                  <img
                    className="logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/50/Riv_gosh_1.jpg"
                    alt="Rive Gauche"
                  />
                </a>
              </div>
            </div>
          // </div>
        ))}
    </>
  );
}

export default CustomCard;

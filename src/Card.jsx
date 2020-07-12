import React from "react";
import Truncate from "react-truncate";
import Logo from "./Logo";

function CustomCard(props) {
  return (
    <>
      {props.info
        // .filter((card) => card.price < card.rawPrice)
        .map((card) => (
          <div className="card" body={card.name} key={card.id}>
            <div className="card-image-wrap">
              <img className="product" alt={card.name} src={card.imageUrl} />
            </div>

            <div className="details">
              <div className="name">
                <Truncate lines={2} ellipsis={<span>.</span>}>
                  {card.name}
                </Truncate>
              </div>

              <div className="small">
                {card.price ? <p className="price">{card.price} ₽</p> : <div />}

                <p className="raw-price">
                  {card.rawPrice ? (
                    card.price ? (
                      <s>{card.rawPrice} ₽</s>
                    ) : (
                      <span>{card.rawPrice} ₽</span>
                    )
                  ) : (
                    <div />
                  )}
                </p>
                {Math.floor((1 - card.price / card.rawPrice) * 100) > 0 ? (
                  <p className="discount">
                    -{Math.floor((1 - card.price / card.rawPrice) * 100)}%
                  </p>
                ) : (
                  <div />
                )}

                <p className="logo-container">
                  <a href={card.href} target="_blank" rel="noopener noreferrer">
                    <Logo shop={card.shop} />
                  </a>
                </p>
              </div>
            </div>
          </div>
          // </div>
        ))}
    </>
  );
}

export default CustomCard;

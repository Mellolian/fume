import React from 'react';
import {Card} from 'react-bootstrap';
import {Grid} from '@material-ui/core';
import TextTruncate from 'react-text-truncate';

function CustomCard(props) {
    return (<> 
 {props.info.filter(card => card.price < card.rawPrice).map(card =>
         <Grid item> 
       
         <Card className='card' body={card.name} key={card.id}>
         
        <div className='card-image-wrap'><Card.Img alt={card.name} src={card.imageUrl}/> </div>
        <Card.Body>
        <Card.Title><a href={card.href} ><TextTruncate
    line={3}
    element="span"
    truncateText="…"
    text={card.name}
    textTruncateChild={<span>Подробнее</span>}
/></a></Card.Title>

        <div style={{fontSize: '20px'}}>
          <b>{card.price} ₽ </b>
       <p >
         <s>{card.rawPrice} ₽</s> Скидка <b>{Math.floor((1-(card.price/card.rawPrice))*100)}%</b>
         </p></div></Card.Body>
         </Card>
         
        </Grid>)}
</>

    )
}


export default CustomCard;
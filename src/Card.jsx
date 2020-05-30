import React from 'react';
import {Card} from 'react-bootstrap';
import {Grid} from '@material-ui/core';


function CustomCard(props) {

    return (<> 
 {props.info.filter(card => card.price < card.rawPrice).map(card =>
         <Grid item> 
       <a id='bootstrap-overrides' href={card.href} >
         <Card className='card' style={{height: '300px', width: '300px'}} 
       body={card.name} 
       key={card.id}>
         
        <div className='card-image-wrap'><Card.Img style={{ maxHeight: '150px', maxWidth: '200px', width:'auto', marginLeft: 'auto', marginRight: 'auto', display: 'block'}} src={card.imageUrl}/> </div>

        <Card.Title style={{fontSize: '15px'}}>{card.name}</Card.Title>

        <div style={{fontSize: '15px'}}><Card.Body><b>{card.price} ₽ </b>
       <p style={{marginBottom: 0, marginTop:0}}>
         <s>{card.rawPrice} ₽</s> Скидка <b>{Math.floor((1-(card.price/card.rawPrice))*100)}%</b>
         </p></Card.Body></div></Card></a>
        </Grid>)}
</>

    )
}


export default CustomCard;
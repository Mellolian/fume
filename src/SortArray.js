import React from 'react';


export default function SortArray (props) {
    let brands = new Set()
    props.info.map(item => {
        brands.add(item.brand)
    })
    let listOfBrands = [...paragraphs]
    console.log(listOfBrands)
}
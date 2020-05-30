import React from 'react';
import CustomCard from './Card'

import {Grid} from '@material-ui/core';
import { Suspense } from 'react';
import Pagination from 'react-js-pagination'


export default function CustomPagination (props){

  let page = props.info.slice(0,8)
console.log(page)
    return (<div>
    <CustomCard info={page} />
</div>)
}
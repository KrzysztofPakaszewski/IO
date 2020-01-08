import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { ItemCompMinimized } from './item-component-minimized';


export const ItemList = (itemList) =>{

  return (
      <Grid container spacing={2}>
        {itemList.map( (item, index)=>(
          <Grid item key={index}>
            {ItemCompMinimized(item)}
          </Grid>
        ))}
      </Grid>
  );
}

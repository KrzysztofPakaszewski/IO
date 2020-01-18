import React from 'react';
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import {ItemCompMinimized} from "app/entities/item/item-component-minimized";

function onClick(e) {
  e.preventDefault();
}

export const SingleCard = (userItem, recommendedItem) =>{

    return (
      <div
        id="singleCard"
        onClick={onClick.bind(this)}
      >
        <Box>
          <Paper>
            {userItem !== undefined ?(
              <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Box>
                  <h3>Your Item</h3>
                  {ItemCompMinimized(userItem)}
                </Box>
                <h1>FOR </h1>
                <Box>
                  <h3>Offered Item</h3>
                  {ItemCompMinimized(recommendedItem)}
                </Box>
              </Box>
            ) : ''}
          </Paper>
        </Box>
      </div>

      );
};


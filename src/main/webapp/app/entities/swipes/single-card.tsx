import React, { Component } from 'react';
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import {connect} from "react-redux";
import {Item} from "app/entities/item/item";
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
              <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center',padding:'3em'}}>
                {ItemCompMinimized(recommendedItem)}
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

}

/*const mapStateToProps = (state) => ({
  userItem: state.userItem,
  recommendedItem: state.recommendedItem,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps
)(SingleCard);*/

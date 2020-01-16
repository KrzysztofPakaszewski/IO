import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {UserCompMinimized} from '../user/user-component-minimized';


// props: {IReview}
export const ReviewComp = (props) =>{

  return (
   <Box maxWidth={600}>
      <Paper elevation ={5}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        {props.reviewer && UserCompMinimized(props.reviewer)}
          <Rating
           value = {props.score}
           readOnly
           />
        </div>
        <p>{props.review}</p>
      </Paper>
  </Box>
  );
}

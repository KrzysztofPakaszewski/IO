import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Button} from 'reactstrap';
import { Link } from 'react-router-dom';


// props: {score:Integer(0-5), login:String, review:String}
export const ReviewComp = (props) =>{

  return (
   <Box maxWidth={600}>
      <Paper>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
        {/*  <Button tag={Link} to={'link to user'} color="link" size="sm">
                {props.login}
            </Button>    */}
          <h4>Login</h4>
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

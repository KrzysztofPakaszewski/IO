import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';



// props = {yourItem, otherItem}
export const MatchingComponent= (props) =>{
    return (
        <Box maxWidth={500}>
            <Paper>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center',padding:'3em'}}>
                    {/* here will be your item minimized*/}
                    <h1>Your Item</h1>
                    <h5>FOR</h5>
                    <h1>This Item</h1>
                    {/* here will be other item minimized*/}
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between',padding:'2em'}}>
                    <Button color="success" id="agree" >
                        <FontAwesomeIcon icon="check" />
                              &nbsp; Agree
                    </Button>
                    <Button color="danger" id="disagree" >
                        <FontAwesomeIcon icon="ban" />
                            &nbsp; Disagree
                    </Button>
                </div>

            </Paper>
        </Box>
    )
};

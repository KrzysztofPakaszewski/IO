import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ItemCompMinimized} from '../item/item-component-minimized';



// props = {yourItem, otherItem}
export const MatchingComponent= (matching, agree,disagree) =>{
    return (
        <Box maxWidth={500}>
            <Paper>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center',padding:'3em'}}>
                    {matching.itemOffered ? ItemCompMinimized(matching.itemOffered) : ''}
                    <h5>FOR</h5>
                    {matching.itemAsked ? ItemCompMinimized(matching.itemAsked) : ''}
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between',padding:'2em'}}>
                    <Button color="success" id="agree" onClick = {()=> agree(matching)} >
                        <FontAwesomeIcon icon="check" />
                              &nbsp; Agree
                    </Button>
                    <Button color="danger" id="disagree" onClick = {()=> disagree(matching)}>
                        <FontAwesomeIcon icon="ban" />
                            &nbsp; Disagree
                    </Button>
                </div>

            </Paper>
        </Box>
    )
};

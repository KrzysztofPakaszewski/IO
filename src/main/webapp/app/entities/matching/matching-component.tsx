import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ItemCompMinimized} from '../item/item-component-minimized';



// props = {yourItem, otherItem}
export const MatchingComponent= (matching,loggedUser) =>{
    return (
        <Box >
            <Paper>
                {matching.itemOffered ?(
                <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Box>
                        <h3>Your Item</h3>
                        {loggedUser.login === matching.itemOffered.owner.login ? ItemCompMinimized(matching.itemOffered):
                        ItemCompMinimized(matching.itemAsked)}
                    </Box>
                    <h3>FOR </h3>
                    <Box>
                       <h3>Offered Item</h3>
                          {loggedUser.login === matching.itemOffered.owner.login ? ItemCompMinimized(matching.itemAsked):
                          ItemCompMinimized(matching.itemOffered)}
                    </Box>
                </Box>
                ) : ' '}
            </Paper>
        </Box>
    )
};

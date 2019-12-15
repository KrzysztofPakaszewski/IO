import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {openFile} from "react-jhipster";


// props: {score:Integer(0-5), login:String, review:String}
export const ItemComp = (itemEntity) =>{

  return (
    <Box maxWidth={600}>
        <dd>
          {itemEntity.image ? (
          <div>
            <a onClick={openFile(itemEntity.imageContentType, itemEntity.image)}>
              <img src={`data:${itemEntity.imageContentType};base64,${itemEntity.image}`} height = '300' width=  '200' />
            </a>
          </div>
        ) : null}
        </dd>
        <dt>
          <span id="title">Title</span>
        </dt>
        <dd>{itemEntity.title}</dd>
        <dt>
          <span id="category">Category</span>
        </dt>
        <dd>{itemEntity.category}</dd>
        <dt>
          <span id="state">State</span>
        </dt>
        <dd>{itemEntity.state}</dd>
        <dt>
          <span id="preferedDelivery">Prefered Delivery</span>
        </dt>
        <dd>{itemEntity.preferedDelivery}</dd>
        <dt>
          <span id="preferences">Preferences</span>
        </dt>
        <dd>{itemEntity.preferences}</dd>
        <dt>
          <span id="hash">Hashtags</span>
        </dt>
        <dd>{itemEntity.hash}</dd>
    </Box>
  );
}

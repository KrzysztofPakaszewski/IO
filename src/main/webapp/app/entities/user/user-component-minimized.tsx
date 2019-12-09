import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {openFile} from "react-jhipster";


// props: {score:Integer(0-5), login:String, review:String}
export const UserCompMinimized = (userEntity) =>{

  return (
    <Box maxWidth={600}>
      <dl className="jh-entity-details">
        <dt>
          <span id="image"></span>
        </dt>
        <dd>{userEntity.image}</dd>
        <dt>
          <span id="login"></span>
        </dt>
        <dd>{userEntity.login}</dd>
      </dl>
    </Box>
  );
}

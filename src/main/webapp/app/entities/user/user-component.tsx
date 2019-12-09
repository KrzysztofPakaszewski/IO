import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {openFile} from "react-jhipster";


// props: {score:Integer(0-5), login:String, review:String}
export const UserComp = (userEntity) =>{

  return (
    <Box maxWidth={600}>
      <h2>
        User <b><i>{userEntity.login}</i></b>
      </h2>
      <dl className="jh-entity-details">
        <dt>
          <span id="title"></span>
        </dt>
        <dd>{userEntity.image}</dd>
        <dt>
          <span id="title">First name</span>
        </dt>
        <dd>{userEntity.firstName}</dd>
        <dt>
          <span id="category">Surname</span>
        </dt>
        <dd>{userEntity.lastName}</dd>
      </dl>
    </Box>
  );
}

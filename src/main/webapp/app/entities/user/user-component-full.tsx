import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import {JhiItemCount, JhiPagination, openFile} from "react-jhipster";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Checkbox} from "@material-ui/core";
import { Button, Col, Row, Table } from 'reactstrap';
import {ItemList} from '../item/item-list';
import {ReviewComp} from '../review/review-component';

// props: {score:Integer(0-5), login:String, review:String}
export const UserCompFull = (userEntity, itemList, reviewList) =>{

  return (
    <Box maxWidth={1200}>
      <h2> User <b><i> {userEntity.login} </i></b></h2>
      <dl className="jh-entity-details">
        <dt>
          <span id="image"></span>
        </dt>
        <dd>{userEntity.image}</dd>
        <dt>
          <span id="firstName">Name</span>
        </dt>
        <dd>{userEntity.firstName}</dd>
        <dt>
          <span id="surname">Surname</span>
        </dt>
        <dd>{userEntity.lastName}</dd>
      </dl>

      <div>

        <h2 id="item-heading">
          User&apos;s items
        </h2>
          {itemList && itemList.length > 0 ?
            ItemList(itemList) : (
            <div className="alert alert-warning">No Items found</div>
          )}
      </div>

      <div>
        <h2 id="review-heading">
          Reviews
        </h2>
        <div className="table-responsive">
          {reviewList && reviewList.length > 0 ? (
              <Grid container>
                 {reviewList.map( (item, index)=>(
                   <Grid item key={index}>
                      {ReviewComp(item)}
                   </Grid>
                  ))}
              </Grid>
              )
            : (
            <div className="alert alert-warning">No Reviews found</div>
          )}
        </div>
      </div>
    </Box>
  );
}

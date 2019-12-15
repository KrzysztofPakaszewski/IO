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


// props: {score:Integer(0-5), login:String, review:String}
export const UserCompFull = (userEntity, itemList, reviewList) =>{

  return (
    <Box maxWidth={600}>
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
    User's items
  </h2>
  <div className="table-responsive">
  {itemList && itemList.length > 0 ? (
    <Table responsive aria-describedby="item-heading">
      <thead>
      <tr>
        <th className="hand" >
          Image
        </th>
        <th className="hand" >
          Title
        </th>
        <th  className="hand" >
          Category
        </th>
        <th className="hand" >
          State
        </th>
        <th className="hand" >
          Prefered Delivery
        </th>
        <th className="hand" >
          Preferences
        </th>
        <th className="hand" >
          Hashtags
        </th>
        <th className="hand" >
          Owner
        </th>
        <th />
      </tr>
      </thead>
      <tbody>
      {itemList.map((item, i) => (
        <tr key={`entity-${i}`}>
          <td>
            {item.image ? (
              <div>
                <a onClick={openFile(item.imageContentType, item.image)}>
                  <img src={`data:${item.imageContentType};base64,${item.image}`} style={{ maxHeight: '30px' }} />
                  &nbsp;
                </a>
                <span>
                          </span>
              </div>
            ) : null}
          </td>
          <td>
            <Button tag={Link} to={`${item.id}`} color="link" size="sm">
              {item.title}
            </Button>
          </td>
          <td>{item.category}</td>
          <td>{item.state}</td>
          <td>{item.preferedDelivery}</td>
          <td>{item.preferences}</td>
          <td>{item.hash}</td>
          <td>
            <Button tag={Link} to={`user/${item.owner.login}`} color="link" size="sm">
              {item.owner.login}
            </Button>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  ) : (
    <div className="alert alert-warning">No Items found</div>
  )}
</div>
  </div>

      <div>
        <h2 id="review-heading">
          Reviews
        </h2>
        <div className="table-responsive">
          {reviewList && reviewList.length > 0 ? (
            <Table responsive aria-describedby="review-heading">
              <thead>
              <tr>
                <th>ID</th>
                <th>Score</th>
                <th>Review</th>
                <th>Reviewer</th>
                <th>User</th>
                <th />
              </tr>
              </thead>
              <tbody>
              {reviewList.map((review, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${review.id}`} color="link" size="sm">
                      {review.id}
                    </Button>
                  </td>
                  <td>{review.score}</td>
                  <td>{review.review}</td>
                  <td>{review.reviewer ? review.reviewer.id : ''}</td>
                  <td>{review.user ? review.user.id : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${review.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Reviews found</div>
          )}
        </div>
      </div>
    </Box>
  );
}

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {UserComp} from "app/entities/user/user-component";
import { IRootState } from 'app/shared/reducers';
import { getUser } from 'app/modules/administration/user-management/user-management.reducer';
import { IUser } from 'app/shared/model/user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import {getEntities} from "app/entities/item/item.reducer";
import {UserCompFull} from "app/entities/user/user-component-full";
import {getUserItems} from "app/entities/item/item.reducer";
import {getReviews} from "app/entities/review/review.reducer";

export interface IUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{  login: string }> {}

export class UserDetail extends React.Component<IUserDetailProps> {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserItems(this.props.match.params.login);
    this.props.getReviews(this.props.match.params.login);
  }

  render() {
    const { userEntity, itemList, reviewList} = this.props;
    return (
      <Row className="justify-content-md-center">
        <Col md="20">
          {userEntity && UserCompFull(userEntity, itemList, reviewList)}
          <Button onClick={() => this.props.history.goBack()} color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ( storeState: IRootState) => ({
  userEntity: storeState.userManagement.user,
  item: storeState.item.entity,
  itemList: storeState.item.entities,
  reviewList: storeState.review.entities,
  review: storeState.review.entity
});

const mapDispatchToProps = { getUser, getUserItems, getReviews };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail);

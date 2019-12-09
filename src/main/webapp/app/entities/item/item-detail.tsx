import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ItemComp} from './item-component';
import {ItemCompMinimized} from './item-component-minimized';

import {
  getCurrentlyLoggedUser,
  getUser,
  getUsers
} from 'app/modules/administration/user-management/user-management.reducer';
import { IRootState } from 'app/shared/reducers';
import { getEntity } from './item.reducer';
import { IItem } from 'app/shared/model/item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import item from "app/entities/item/item";
import {ReviewComp} from "app/entities/review/review-component";

export interface IItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ItemDetail extends React.Component<IItemDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getUsers();
  }

  render() {
    const { itemEntity } = this.props;
    return (
      <Row className="justify-content-md-center">
        <Col md="20">
          <h2>
            <b><i>{itemEntity.title}</i></b>
          </h2>
          <dl className="jh-entity-details">
            {ItemComp(itemEntity)}
          </dl>
          <Button tag={Link} to={`/item`} replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/item/${itemEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/item/${itemEntity.id}/delete`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Delete</span>
          </Button>
          &nbsp;
          <Button tag={Link} /*to={`${match.url}/${item.id}/delete`}*/ color="primary"  /*disabled = {getUser(item.owner.id) == getCurrentlyLoggedUser()}*/>
            <FontAwesomeIcon icon = "plus" /> <span className="d-none d-md-inline">Interested</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ item }: IRootState) => ({
  itemEntity: item.entity,
  user: item.entity.owner,
});

const mapDispatchToProps = { getEntity, getUsers};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);

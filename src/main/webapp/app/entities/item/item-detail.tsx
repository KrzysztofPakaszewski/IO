import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './item.reducer';
import { IItem } from 'app/shared/model/item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ItemDetail extends React.Component<IItemDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { itemEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Item [<b>{itemEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{itemEntity.title}</dd>
            <dt>
              <span id="state">State</span>
            </dt>
            <dd>{itemEntity.state}</dd>
            <dt>
              <span id="category">Category</span>
            </dt>
            <dd>{itemEntity.category}</dd>
            <dt>
              <span id="image">Image</span>
            </dt>
            <dd>
              {itemEntity.image ? (
                <div>
                  <a onClick={openFile(itemEntity.imageContentType, itemEntity.image)}>
                    <img src={`data:${itemEntity.imageContentType};base64,${itemEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {itemEntity.imageContentType}, {byteSize(itemEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="hash">Hash</span>
            </dt>
            <dd>{itemEntity.hash}</dd>
            <dt>
              <span id="preferences">Preferences</span>
            </dt>
            <dd>{itemEntity.preferences}</dd>
            <dt>
              <span id="preferedDelivery">Prefered Delivery</span>
            </dt>
            <dd>{itemEntity.preferedDelivery}</dd>
            <dt>Owner</dt>
            <dd>{itemEntity.owner ? itemEntity.owner.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/item" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/item/${itemEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ item }: IRootState) => ({
  itemEntity: item.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);

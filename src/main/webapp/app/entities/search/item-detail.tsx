import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addNewInterest } from './search.reducer';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './search.reducer';

export interface IItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ItemDetail extends React.Component<IItemDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  handleInterest() {
    addNewInterest(this.props.itemEntity)
  }

  render() {
    const { itemEntity } = this.props;

    return (
      <Row className="justify-content-md-center">
        <Col md="20">
          <h2>
            Item <b><i>{itemEntity.title}</i></b> of User <b><i> {itemEntity.owner == null ? " no owner " : (<Link to={'/user/'+itemEntity.owner.id}>{itemEntity.owner.login}</Link>)} </i></b>
          </h2>
          <dl className="jh-entity-details">
            <dd>
              {itemEntity.image ? (
                <div>
                  <a onClick={openFile(itemEntity.imageContentType, itemEntity.image)}>
                    <img src={`data:${itemEntity.imageContentType};base64,${itemEntity.image}`} style={{ maxHeight: '30px' }}/>
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
          </dl>
          &nbsp;
          <Button tag={Link} to="/search" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button onClick={() => this.handleInterest()}>
            <FontAwesomeIcon icon = "plus" /> <span className="d-none d-md-inline">Interested</span>
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

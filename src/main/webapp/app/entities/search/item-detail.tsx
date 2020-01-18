import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps} from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addNewInterest } from './search.reducer';
import { getCurrentlyLoggedUser } from "app/modules/administration/user-management/user-management.reducer";


import { IRootState } from 'app/shared/reducers';
import { getEntity } from './search.reducer';

export interface IItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IItemDetailState{
  showInterestedButton: boolean;
}

export class ItemDetail extends React.Component<IItemDetailProps, IItemDetailState> {
  constructor(props) {
    super(props);
    this.state = {
      showInterestedButton: true
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getCurrentlyLoggedUser();
  }

  handleInterest() {
    addNewInterest(this.props.itemEntity);
    this.setState({
      showInterestedButton: false
    });
  }

  interestButtonLogic(itemEntity, currentUser) {
    return !itemEntity.interesteds.some(function (user) {return user.login === currentUser})
  }

  render() {
    const { itemEntity } = this.props;

    return (
      <Row className="justify-content-md-center">
        <Col md="20">
          <h2>
            Item <b><i>{itemEntity.title}</i></b> of User <b><i> {itemEntity.owner == null ? " no owner " : (<Link to={'/user/'+itemEntity.owner.login + '/profile'}>{itemEntity.owner.login}</Link>)} </i></b>
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
          <Button onClick={() => this.props.history.goBack()} replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          {this.props.user && itemEntity.owner && this.props.user.login === itemEntity.owner.login &&
              <Button tag={Link} to={`/item/${itemEntity.id}/edit`} replace color="primary">
                  <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
              </Button>
              <Button tag={Link} to={`/item/${itemEntity.id}/delete`} replace color="danger">
                  <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                </Button>
              }
          { this.state.showInterestedButton && itemEntity && itemEntity.owner && itemEntity.owner.login !== this.props.user.login &&
            this.interestButtonLogic(itemEntity, this.props.user.login) &&
            (<Button onClick={() => this.handleInterest()}>
              <FontAwesomeIcon icon="plus"/> <span className="d-none d-md-inline">Interested</span>
            </Button>)
          }
        </Col>
      </Row>
    );
  }
}


const mapStateToProps = ({ item, userManagement }: IRootState) => ({
  itemEntity: item.entity,
  user: userManagement.user,
});

const mapDispatchToProps = {
  getEntity,
  getCurrentlyLoggedUser
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);

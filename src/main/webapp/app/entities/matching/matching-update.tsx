import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IItem } from 'app/shared/model/item.model';
import { getEntities as getItems } from 'app/entities/item/item.reducer';
import { getEntity, updateEntity, createEntity, reset } from './matching.reducer';
import { IMatching } from 'app/shared/model/matching.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMatchingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMatchingUpdateState {
  isNew: boolean;
  itemOfferedId: string;
  itemAskedId: string;
}

export class MatchingUpdate extends React.Component<IMatchingUpdateProps, IMatchingUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      itemOfferedId: '0',
      itemAskedId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getItems();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { matchingEntity } = this.props;
      const entity = {
        ...matchingEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/matching');
  };

  render() {
    const { matchingEntity, items, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="culexApp.matching.home.createOrEditLabel">Create or edit a Matching</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : matchingEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="matching-id">ID</Label>
                    <AvInput id="matching-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="stateOfExchangeLabel" check>
                    <AvInput id="matching-stateOfExchange" type="checkbox" className="form-control" name="stateOfExchange" />
                    State Of Exchange
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="chatLabel" for="matching-chat">
                    Chat
                  </Label>
                  <AvField id="matching-chat" type="text" name="chat" />
                </AvGroup>
                <AvGroup>
                  <Label for="matching-itemOffered">Item Offered</Label>
                  <AvInput id="matching-itemOffered" type="select" className="form-control" name="itemOffered.id">
                    <option value="" key="0" />
                    {items
                      ? items.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="matching-itemAsked">Item Asked</Label>
                  <AvInput id="matching-itemAsked" type="select" className="form-control" name="itemAsked.id">
                    <option value="" key="0" />
                    {items
                      ? items.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/matching" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  items: storeState.item.entities,
  matchingEntity: storeState.matching.entity,
  loading: storeState.matching.loading,
  updating: storeState.matching.updating,
  updateSuccess: storeState.matching.updateSuccess
});

const mapDispatchToProps = {
  getItems,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchingUpdate);

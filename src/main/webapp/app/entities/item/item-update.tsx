import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './item.reducer';
import { IItem } from 'app/shared/model/item.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IItemUpdateState {
  isNew: boolean;
  ownerId: string;
}

export class ItemUpdate extends React.Component<IItemUpdateProps, IItemUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: '0',
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

    this.props.getUsers();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { itemEntity } = this.props;
      const entity = {
        ...itemEntity,
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
    this.props.history.push('/item');
  };

  render() {
    const { itemEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    const { image, imageContentType } = itemEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="culexApp.item.home.createOrEditLabel"><b><i>{itemEntity.title}</i></b> </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : itemEntity} onSubmit={this.saveEntity}>
                <AvGroup>
                  <AvGroup>
                    <Label id="imageLabel" for="image">
                    </Label>
                    <br />
                    {image ? (
                      <div>
                        <a onClick={openFile(imageContentType, image)}>
                          <img src={`data:${imageContentType};base64,${image}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('image')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_image" type="file" onChange={this.onBlobChange(true, 'image')} accept="image/*" />
                    <AvInput type="hidden" name="image" value={image} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="titleLabel" for="item-title">
                    Title
                  </Label>
                  <AvField id="item-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="categoryLabel" for="item-category">
                    Category
                  </Label>
                  <AvInput
                    id="item-category"
                    type="select"
                    className="form-control"
                    name="category"
                    value={(!isNew && itemEntity.category) || 'Movies'}
                  >
                    <option value="Movies">Movies</option>
                    <option value="Games">Games</option>
                    <option value="Books">Books</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="stateLabel" for="item-state">
                    State
                  </Label>
                  <AvField id="item-state" type="text" name="state" />
                </AvGroup>
                <AvGroup>
                  <Label id="preferedDeliveryLabel" for="item-preferedDelivery">
                    Prefered Delivery
                  </Label>
                  <AvInput
                    id="item-preferedDelivery"
                    type="select"
                    className="form-control"
                    name="preferedDelivery"
                    value={(!isNew && itemEntity.preferedDelivery) || 'Courier'}
                  >
                    <option value="Courier">Courier</option>
                    <option value="InPost">InPost</option>
                    <option value="PersonalCollection">PersonalCollection</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="preferencesLabel" for="item-preferences">
                    Preferences
                  </Label>
                  <AvField id="item-preferences" type="text" name="preferences" />
                </AvGroup>
                <AvGroup>
                  <Label id="hashLabel" for="item-hash">
                    Hash
                  </Label>
                  <AvField id="item-hash" type="text" name="hash" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to={`/item/`} replace color="info">
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
  users: storeState.userManagement.users,
  itemEntity: storeState.item.entity,
  loading: storeState.item.loading,
  updating: storeState.item.updating,
  updateSuccess: storeState.item.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemUpdate);

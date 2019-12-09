import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {UserComp} from "app/entities/user/user-component";
import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user.reducer';
import { IUser } from 'app/shared/model/user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UserDetail extends React.Component<IUserDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userEntity } = this.props;
    return (
      <Row className="justify-content-md-center">
        <Col md="20">
          {UserComp(userEntity)}
          <Button tag={Link} to="/item" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ user }: IRootState) => ({
  userEntity: user.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail);

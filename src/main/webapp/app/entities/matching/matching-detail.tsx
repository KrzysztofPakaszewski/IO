import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './matching.reducer';
import { IMatching } from 'app/shared/model/matching.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMatchingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MatchingDetail extends React.Component<IMatchingDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { matchingEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Matching [<b>{matchingEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="chat">Chat</span>
            </dt>
          </dl>
          <Button tag={Link} to="/matching" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/matching/${matchingEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ matching }: IRootState) => ({
  matchingEntity: matching.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchingDetail);

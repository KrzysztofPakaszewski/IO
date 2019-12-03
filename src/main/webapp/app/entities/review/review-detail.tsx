import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import {ReviewComp} from './review-component';

export interface IReviewDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ReviewDetail extends React.Component<IReviewDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { reviewEntity } = this.props;
    return (
      <div>
          <h2>
            Review [<b>{reviewEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            {ReviewComp(reviewEntity)}
          </dl>
          <Button tag={Link} to="/review" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/review/${reviewEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ review }: IRootState) => ({
  reviewEntity: review.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewDetail);

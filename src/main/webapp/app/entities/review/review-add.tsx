import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getCurrentlyLoggedUser} from 'app/modules/administration/user-management/user-management.reducer';
import { createEntity,reset} from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReviewAddProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IReviewAddState {
  reviewerId: string;
  userId: string;
  review: string;
}

export class ReviewAdd extends React.Component<IReviewAddProps, IReviewAddState> {
  constructor(props) {
    super(props);
    this.state = {
      reviewerId: "",
      review: "",
      userId: this.props.match.params.id
    };
  }
  componentDidMount(){
    this.props.getCurrentlyLoggedUser();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  handleClose = () => {
    this.props.history.push('/review');
  };

  render() {
    const {  user } = this.props;

    return (
      <div>
        <p> {user.login}</p>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
  updating: storeState.review.updating,
  updateSuccess: storeState.review.updateSuccess
});

const mapDispatchToProps = {
  getCurrentlyLoggedUser,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewAdd);

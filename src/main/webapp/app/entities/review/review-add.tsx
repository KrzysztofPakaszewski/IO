import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IUser } from 'app/shared/model/user.model';
import { getCurrentUserAndUserById} from 'app/modules/administration/user-management/user-management.reducer';
import { createEntity,reset} from './review.reducer';
import { IReview } from 'app/shared/model/review.model';
import {Rating} from '@material-ui/lab';
import {TextField,Paper,Box} from '@material-ui/core';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReviewAddProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export interface IReviewAddState {
  review: string;
  score: number;
}

export class ReviewAdd extends React.Component<IReviewAddProps, IReviewAddState> {
  constructor(props) {
    super(props);
    this.state = {
      review: '',
      score: 0
    };
    this.handleSave = this.handleSave.bind(this);
  }
  componentDidMount(){
      this.props.getCurrentUserAndUserById(this.props.match.params.login);
  }

  handleSave(event) {
        event.preventDefault();
        const entity = {
            ...this.state,
            reviewer:  this.props.users[0],
            user: this.props.users[1]
        };
        this.props.createEntity(entity);
        this.handleClose();
    }

  handleClose = () => {
    this.props.history.push('/review');
  };

  render() {
    return (
    <Box width={400}>
    <Paper>
      <form onSubmit= {this.handleSave} style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly', padding: '1em' }}>
        <Rating
            name="score"
            value={this.state.score}
            onChange={(event,newValue) =>{
                this.setState({
                  score: newValue
                })
            }}
        />
        <TextField
            style= {{padding:'1em'}}
            id="review"
            label="review"
            value={this.state.review}
            multiline
            onChange={event=>{
              this.setState({
              review: event.target.value
              })
            }}
            required={true}
        />
        <Button color="primary" id="save-entity" type="submit">
             <FontAwesomeIcon icon="save" />
                  &nbsp; Save
              </Button>
      </form>
    </Paper>
    </Box>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  updating: storeState.review.updating,
  updateSuccess: storeState.review.updateSuccess
});

const mapDispatchToProps = {
  getCurrentUserAndUserById,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewAdd);

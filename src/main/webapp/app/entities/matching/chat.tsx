import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getChat, addMessage } from './matching.reducer';
import { IMatching } from 'app/shared/model/matching.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMatchingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class Chat extends React.Component<IMatchingDetailProps> {
  componentDidMount() {
    this.props.getChat(this.props.match.params.id);
  }

  sendMessage = (event, errors, values) => {
    if (errors.length === 0) {
      const { chat } = this.props;
      const data = {
        id: this.props.match.params.id,
        ...values
      };

      this.props.addMessage(data);
    }
  };

  render() {
    const { chat } = this.props;
    return (
      <div>
        <h2 id="matching-heading">
          Chat
        </h2>
        <div>
          {chat && chat.length > 0 ? (
              <div>
              {chat.map((matching, i) => (

                <tr key={`entity-${i}`}>

                  <td>{matching.owner}</td>
                  <td>{matching.message}</td>

                </tr>
              ))}
              </div>

          ) : (
            <div className="alert alert-warning">No Matchings found</div>
          )}
          <AvForm  onSubmit={this.sendMessage}>
            <AvField id="matching-chat" type="text" name="message" />
            <Button tag={Link} id="cancel-save" to="/matching" replace color="info">
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">Back</span>
            </Button>
            &nbsp;
            <Button color="primary" id="save-entity" type="submit" >
              <FontAwesomeIcon icon="save" />
              &nbsp; Save
            </Button>
          </AvForm>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ matching }: IRootState) => ({
  chat: matching.chat
});

const mapDispatchToProps = { getChat, addMessage };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import {ICrudGetAction, Storage} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Observable, Observer, Subscription } from 'rxjs';

import { IRootState } from 'app/shared/reducers';
import { getChat, addMessage, sendMsg } from './matching.reducer';
import { IMatching } from 'app/shared/model/matching.model';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';

export interface IMatchingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class Chat extends React.Component<IMatchingDetailProps> {

  stompClient = null;
  subscriber = null;
  connection: Promise<any> = this.createConnection();
  connectedPromise: any;
  listener: Observable<any> = this.createListener();
  listenerObserver: Observer<any>;
  alreadyConnectedOnce = false;
  private subscription: Subscription;
  messages: Array<any>;
  chatId: string;

  constructor(props) {
    super(props);
    this.connection = this.createConnection();
    this.listener = this.createListener();
    this.messages = [];
  }

  connect() {
    if (this.connectedPromise === null) {
      this.connection = this.createConnection();
    }
    // building absolute path so that websocket doesn't fail when deploying with a context path
    let url = '/websocket/tracker';
    // url = this.location.prepareExternalUrl(url);
    const authToken = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
    if (authToken) {
      url += '?access_token=' + authToken;
    }
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
    const headers = {};
    this.stompClient.connect(headers, () => {
      this.connectedPromise('success');
      this.connectedPromise = null;
      this.subscribe();
      if (!this.alreadyConnectedOnce) {
        this.alreadyConnectedOnce = true;
      }
    });
  };

  receive() {
    return this.listener;
  };

  subscribe() {
    this.connection.then(() => {
      this.subscriber = this.stompClient.subscribe('/chat/public/' + this.chatId, data => {
        this.listenerObserver.next(JSON.parse(data.body));
      }, dat2 => {
        this.messages = dat2;
      });
    });
  }

  private createListener(): Observable<any> {
    return new Observable(observer => {
      this.listenerObserver = observer;
    });
  }

  private createConnection(): Promise<any> {
    return new Promise((resolve, reject) => (this.connectedPromise = resolve));
  }

  componentDidMount() {
    this.chatId = this.props.match.params.id;
    // this.props.getChat(this.props.match.params.id);
    this.connect();
    // const dat = this;
    this.receive().subscribe(message => {

      if (Array.isArray(message)) {
        this.messages = message;
      } else {
        this.messages.push(message);
      }
      this.setState(function(oldState, oldProps) {
        return {
        };
      })
    });
    // this.forceUpdate();
  };

  componentWillUnmount() {
    this.disconnect();
  };

  sendMessage = (event, errors, values) => {
    if (errors.length === 0) {
      // const { chat, messages } = this.props;
      const data = {
        id: this.props.match.params.id,
        ...values
      };

      this.props.addMessage(data);
    }
  };

  sendMsg = (event, errors, values) => {
    const { message } = values;
    if (message.length === 0) {
      return;
    }

    // console.log(message);
    this.send(message);
    // this.props.addMessage(message);

  };

  send(message) {
    if (this.stompClient !== null && this.stompClient.connected) {
      this.stompClient.send(
        '/chat/' + this.chatId, // destination
        JSON.stringify({ message }), // body
        {} // header
      );
    }
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      this.stompClient = null;
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    this.alreadyConnectedOnce = false;
  }


  render() {
    const { chat } = this.props;
    // const { messages } = this.state.matching;

    return (
      <div>
        <h2 id="matching-heading">
          Chat
        </h2>
        <div>
          <div className="chat-messages">
            {this.messages.map((message, i) => (
              <div className="row" key={`entity-${i}`}>
                <div className="col-sm-2">
                  <strong>{message.userLogin}</strong>
                </div>
                <div className="col-sm-8">
                  {message.message}
                </div>
                <div className="col-sm-2">
                  <div>
                    {message.time}
                  </div>
                </div>

              </div>
            ))}

          </div>

          <AvForm name="chatForm" onSubmit={this.sendMsg}>
            <AvField id="form-control" type="text" name="message"/>
            <Button color="primary" id="save-entity" type="submit">
              <FontAwesomeIcon icon="save"/>
              &nbsp; Send
            </Button>
          </AvForm>

        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ matching }: IRootState) => ({
  chat: matching.chat,
  // messages: matching.messages || [],
  message: ''
});

const mapDispatchToProps = { getChat, addMessage, sendMsg, };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

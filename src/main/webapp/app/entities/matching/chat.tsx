import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Col} from 'reactstrap';
import {AvFeedback, AvForm, AvGroup, AvInput, AvField} from 'availity-reactstrap-validation';
import {ICrudGetAction, Storage} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Observable, Observer, Subscription} from 'rxjs';

import {IRootState} from 'app/shared/reducers';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';

export interface IMatchingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export class Chat extends React.Component<IMatchingDetailProps> {
  readonly state: any = {message: '', messages: []};

  stompClient = null;
  subscriber = null;
  connection: Promise<any> = this.createConnection();
  connectedPromise: any;
  listener: Observable<any> = this.createListener();
  listenerObserver: Observer<any>;
  alreadyConnectedOnce = false;
  private subscription: Subscription;
  chatId: string;

  constructor(props) {
    super(props);
    this.connection = this.createConnection();
    this.listener = this.createListener();
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  connect() {
    if (this.connectedPromise === null) {
      this.connection = this.createConnection();
    }
    // building absolute path so that websocket doesn't fail when deploying with a context path
    let url = '/websocket/tracker';
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
    this.connect();
    this.receive().subscribe(message => {

      if (Array.isArray(message)) {
        this.setState({messages: message})
      } else {
        const temp = this.state.messages;
        temp.push(message);
        this.setState({"messages": temp});
      }
    });
  };

  componentWillUnmount() {
    this.disconnect();
  };

  sendMsg = (event, errors, values) => {
    const message = this.state.message;
    if (this.stompClient !== null && this.stompClient.connected) {
      this.stompClient.send(
        '/chat/' + this.chatId, // destination
        JSON.stringify({message}), // body
        {} // header
      );
    }
    this.setState({message: ''});

  };

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

  onHandleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  render() {

    return (
      <div>
        <h2 id="matching-heading">
          Chat
        </h2>
        <div>
          <div className="chat-messages">
            {this.state.messages.map((message, i) => (
              <div className="row" key={`entity-${i}`}>
                <div className="col-sm-2">
                  <strong>{message.userName}</strong>
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


          <AvForm id="form-control" name="chatForm" onSubmit={this.sendMsg}>
            <div className="form-group">
              <input className="form-control" type="text" onChange={this.onHandleChange} name="message"
                     value={this.state.message}/>
            </div>
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

const mapStateToProps = ({matching}: IRootState) => ({});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

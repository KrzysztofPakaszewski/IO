import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Row>
      <Col md="9">
        <h2>Hello, it&apos;s nice to see you here!</h2>
        <p className="lead">Meet Culex. Culex was made to gather people that want to get rid of items they don&apos;t need and receive something that they might put a new life in. We are here for you, everytime and everywhere you need us. Just create an account or sign in if you have one and enjoy our app. It&apos;s pretty simple and intuitive. Exchanging your stuff with strangers has never been so easy! Let&apos;s start the ride!</p>

        {(account && account.login) ? (
          <div>
            <Alert color="success">You are logged in as user {account.login}.</Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              You are not logged in:
              <Link to="/login" className="alert-link">
                {' '}
                sign in
              </Link>
            </Alert>

            <Alert color="warning">
              You do not have an account yet?&nbsp;
              <Link to="/account/register" className="alert-link">
                Register a new account
              </Link>
            </Alert>
          </div>
        )}
      </Col>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);

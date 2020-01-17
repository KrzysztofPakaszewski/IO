import React from 'react';

import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserDetail from './user-detail';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:login/profile`} component={UserDetail} />
    </Switch>
  </>
);

export default Routes;


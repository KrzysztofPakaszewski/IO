import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Swipe from './swipe';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={match.url} component={Swipe} />
    </Switch>
  </>
);

export default Routes;

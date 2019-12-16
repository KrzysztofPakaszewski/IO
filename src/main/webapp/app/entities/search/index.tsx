import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Search from './search';
import ItemDetail from './item-detail';
import SearchImInterestedIn from './search-im-interested-in';


const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/interested/:id`} component={SearchImInterestedIn} />
      <ErrorBoundaryRoute exact path={`${match.url}/interested`} component={SearchImInterestedIn} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={Search} />

    </Switch>
  </>
);

export default Routes;

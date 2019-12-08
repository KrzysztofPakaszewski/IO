import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Matching from './matching';
import MatchingDetail from './matching-detail';
import MatchingUpdate from './matching-update';
import MatchingDeleteDialog from './matching-delete-dialog';
import MatchingList from './matching-list';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MatchingUpdate} />
      <ErrorBoundaryRoute exact path = {`${match.url}/list`} component = {MatchingList}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MatchingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MatchingDetail} />
      <ErrorBoundaryRoute path={match.url} component={Matching} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MatchingDeleteDialog} />
  </>
);

export default Routes;

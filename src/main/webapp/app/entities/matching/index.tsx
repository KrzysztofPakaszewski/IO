import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Matching from './matching';
import MatchingDetail from './matching-detail';
import MatchingUpdate from './matching-update';
import Chat from './chat';
import MatchingDeleteDialog from './matching-delete-dialog';
import MatchingList from './matching-list';
import Exchange from './exchange';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/matching`} component = {Matching}/>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MatchingUpdate} />
      <ErrorBoundaryRoute exact path = {`${match.url}/list`} component = {MatchingList}/>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MatchingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/chat`} component={Chat} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MatchingDetail} />
      <ErrorBoundaryRoute path={match.url} component={Exchange} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MatchingDeleteDialog} />
  </>
);

export default Routes;

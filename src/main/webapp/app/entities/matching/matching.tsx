import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './matching.reducer';
import { IMatching } from 'app/shared/model/matching.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMatchingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Matching extends React.Component<IMatchingProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { matchingList, match } = this.props;
    return (
      <div>
        <h2 id="matching-heading">
          Matchings
        </h2>
        <div className="table-responsive">
          {matchingList && matchingList.length > 0 ? (
            <Table responsive aria-describedby="matching-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>State Of Exchange</th>
                  <th>Item Offered</th>
                  <th>Item Asked</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {matchingList.map((matching, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${matching.id}`} color="link" size="sm">
                        {matching.id}
                      </Button>
                    </td>
                    <td>{matching.stateOfExchange ? 'true' : 'false'}</td>
                    <td>{matching.itemOffered ? <Link to={`search/${matching.itemOffered.id}`}>{matching.itemOffered.id}</Link> : ''}</td>
                    <td>{matching.itemAsked ? <Link to={`search/${matching.itemAsked.id}`}>{matching.itemAsked.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${matching.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${matching.id}/chat`} color="warning" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">Chat</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${matching.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Matchings found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ matching }: IRootState) => ({
  matchingList: matching.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matching);

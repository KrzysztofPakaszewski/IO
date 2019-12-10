import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { openFile, byteSize, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './search.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ISearchProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ISearchState extends IPaginationBaseState{
  filteredItems: any;
  search: string;
}

export class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: getSortState(this.props.location, ITEMS_PER_PAGE).itemsPerPage,
      sort: getSortState(this.props.location, ITEMS_PER_PAGE).sort,
      order: getSortState(this.props.location, ITEMS_PER_PAGE).order,
      activePage: getSortState(this.props.location, ITEMS_PER_PAGE).activePage,
      filteredItems: this.props.itemList,
      search: ""
      };
  }

  componentDidMount(){
    this.getEntities();
    this.setState({
      filteredItems: this.props.itemList
    });
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  handleSearch = (event, values) => {
  event.preventDefault();
    this.setState(
      {
        search: values.searchValue
      },
      () => this.handleSearch2()
    );
  };

  handleSearch2(){
    let currentList = null;
    let newList = null;

    if (this.state.search !== "") {
      currentList = this.props.itemList;
      newList = currentList.filter(item => {
        const lc = item.title.toLowerCase();
        const filter = this.state.search.toLowerCase();
        return lc.includes(filter);
      });
    } else {
        newList = this.props.itemList;
    }
    this.setState({
      filteredItems: newList
    });
    this.props.history.push(`${this.props.location.pathname}?search=${this.state.search}&page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { match, totalItems } = this.props;
    const { filteredItems } = this.state.filteredItems;
    return (
      <div>
        <h2 id="search-heading">
          Find something for yourself
        </h2>
        <div>
          <AvForm id="search-form" onValidSubmit={this.handleSearch}>
            <AvField
              name="searchValue"
              placeholder={'Im looking for...'}
              validate={{
                required: { value: true, errorMessage: 'Your input must be at least 1 character.' },
                pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: 'Your username can only contain letters and digits.' },
              }}
            />
            <Button id="search-submit" color="primary" type="submit">
              Search <FontAwesomeIcon icon="search" />
            </Button>
          </AvForm>
        </div>
        <div className="table-responsive">
          {filteredItems && filteredItems.length > 0 ? (
            <Table responsive aria-describedby="item-heading">
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    ID <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    Image
                  </th>
                  <th className="hand" onClick={this.sort('title')}>
                    Title <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('category')}>
                    Category <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('state')}>
                    State <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('preferedDelivery')}>
                    Prefered Delivery <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('preferences')}>
                    Preferences <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('hash')}>
                    Hash <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${item.id}`} color="link" size="sm">
                        {item.id}
                      </Button>
                    </td>
                    <td>
                      {item.image ? (
                        <div>
                          <a onClick={openFile(item.imageContentType, item.image)}>
                            <img src={`data:${item.imageContentType};base64,${item.image}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.state}</td>
                    <td>{item.preferedDelivery}</td>
                    <td>{item.preferences}</td>
                    <td>{item.hash}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${item.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Items found</div>
          )}
        </div>
        <div className={filteredItems&& filteredItems.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ item }: IRootState) => ({
  itemList: item.entities,
  totalItems: item.totalItems,
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
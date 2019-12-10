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
  checkedBooks: boolean;
  checkedGames: boolean;
  checkedMovies: boolean;
}

export class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props) {
    super(props);
    let categories = this.getUrlParameter('category');
    this.state = {
      itemsPerPage: 5,
      sort: getSortState(this.props.location, ITEMS_PER_PAGE).sort,
      order: getSortState(this.props.location, ITEMS_PER_PAGE).order,
      activePage: getSortState(this.props.location, ITEMS_PER_PAGE).activePage,
      filteredItems: this.props.itemList,
      search: this.getUrlParameter('search'),
      checkedBooks: categories.includes("books"),
      checkedGames: categories.includes("games"),
      checkedMovies: categories.includes("movies")
      };
    this.searchFilter()
  }

  getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  componentDidMount(){
    this.getEntities();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemList !== prevProps.itemList ) {
      this.setState(
        {
          filteredItems: this.props.itemList
        });
    }
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
    this.pushHistory();
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  handleSearch = (e, values) => {
    this.setState(
      {
        search: values.searchValue
      },
      () => this.searchFilter()
    );
  };

  searchFilter(){
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

    this.pushHistory();
  }

  pushHistory(){
    this.props.history.push(`${this.props.location.pathname}?search=${this.state.search}&page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}&category=${this.state.checkedBooks ? "books," : ""}
${this.state.checkedGames ? "games," : ""}${this.state.checkedMovies ? "movies," : ""}`);
  }

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  handleClick = (item) => {
    this.props.history.push(`${this.props.location.pathname}/${item.id}`);
  };

  handleBooksCheckboxChange = event =>
    this.setState({checkedBooks: event.target.checked},
      () => this.checkboxFilter()
    );


  handleGamesCheckboxChange = event =>
    this.setState({ checkedGames: event.target.checked },
      () => this.checkboxFilter());

  handleMoviesCheckboxChange = event =>
    this.setState({ checkedMovies: event.target.checked },
      () => this.checkboxFilter());

  checkboxFilter() {
    this.pushHistory();
  }


  render() {
    const { match } = this.props;
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
        <div>
          <label>
            <Checkbox
              checked={this.state.checkedBooks}
              onChange={this.handleBooksCheckboxChange}
            />
            <span>Books</span>
          </label>
          <label>
            <Checkbox
              checked={this.state.checkedGames}
              onChange={this.handleGamesCheckboxChange}
            />
            <span>Games</span>
          </label>
          <label>
            <Checkbox
              checked={this.state.checkedMovies}
              onChange={this.handleMoviesCheckboxChange}
            />
            <span>Movies</span>
          </label>
        </div>
        <div className="table-responsive">
          {this.state.filteredItems && this.state.filteredItems.length > 0 ? (
            <Table responsive aria-describedby="item-heading">
              <thead>
                <tr>
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
                    Hashtags <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.filteredItems.map((item, i) => (
                  <tr id="clickableRow" key={`entity-${i}`} onClick={() => this.handleClick(item)} role="button">
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
                        <Button tag={Link} to={`${match.url}/${item.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Items found</div>
          )}
        </div>
        <div className={this.state.filteredItems && this.state.filteredItems.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={this.state.filteredItems.length} itemsPerPage={this.state.itemsPerPage} />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.state.filteredItems.length}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ item }: IRootState) => ({
  itemList: item.entities
});

const mapDispatchToProps = {
  getEntities
};

const Checkbox = props => (
  <input type="checkbox" {...props} />
)

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

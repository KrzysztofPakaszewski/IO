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
import {Category} from "app/shared/model/enumerations/category.model";
import {getUrlParameter} from "app/shared/util/url-utils";

import { ItemList } from '../item/item-list';

export interface ISearchProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ISearchState extends IPaginationBaseState{
  search: string;
  checkedBooks: boolean;
  checkedGames: boolean;
  checkedMovies: boolean;
}

export class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props) {
    super(props);
    const categories = getUrlParameter('category');
    this.state = {
      itemsPerPage: getSortState(this.props.location, ITEMS_PER_PAGE).itemsPerPage,
      sort: getSortState(this.props.location, ITEMS_PER_PAGE).sort,
      order: getSortState(this.props.location, ITEMS_PER_PAGE).order,
      activePage: getSortState(this.props.location, ITEMS_PER_PAGE).activePage,
      search: getUrlParameter('search'),
      checkedBooks: categories.includes("books"),
      checkedGames: categories.includes("games"),
      checkedMovies: categories.includes("movies")
      };
  }

  componentDidMount(){
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.searchFilter()
    );
  };


  handlePagination = activePage => {
    this.setState(
      {
        activePage : activePage
      },
      () => this.searchFilter()
    );
  };


  handleSearch = (e, values) => {
    this.setState(
      {
        search: values.searchValue
      },
      () => this.searchFilter()
    );
  };

/*
  handleRowClick = (item) => {
    this.props.history.push(`${this.props.location.pathname}/${item.id}`,  {showInterestedButton: true});
  };
  */


  handleBooksCheckboxChange = event =>
    this.setState({checkedBooks: event.target.checked},
      () => this.searchFilter());

  handleGamesCheckboxChange = event =>
    this.setState({ checkedGames: event.target.checked },
      () => this.searchFilter());

  handleMoviesCheckboxChange = event =>
    this.setState({ checkedMovies: event.target.checked },
      () => this.searchFilter());

  searchFilter() {
    this.getEntities();
    this.pushHistory();
  }

  pushHistory(){
    this.props.history.push(`${this.props.location.pathname}?search=${this.state.search}&page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}&category=${this.state.checkedBooks ? "books," : ""}
${this.state.checkedGames ? "games," : ""}${this.state.checkedMovies ? "movies," : ""}`);
  }

  getEntities = () => {
    const { search, activePage, itemsPerPage, sort, order, checkedBooks, checkedGames, checkedMovies} = this.state;
    this.props.getEntities(search, activePage - 1, itemsPerPage, `${sort},${order}`, checkedBooks ? "Books" : "", checkedGames ? "Games" : "", checkedMovies ? "Movies" : "");
  };


  render() {
    const { match, itemList, totalItems } = this.props;
    return (
      <div>
        <h2 id="search-heading">
          Find something for yourself
        </h2>
        <div>
          <Button tag={Link} to={`${match.url}/interested`} color="info" size="lg">
            <FontAwesomeIcon icon="eye" /> <span>Items I'm interested in...</span>
          </Button>
        </div>
        <div>
          <AvForm id="search-form" onValidSubmit={this.handleSearch}>
            <AvField
              name="searchValue"
              placeholder={'Im looking for...'}
              validate={{
                required: { value: true, errorMessage: 'Your input must be at least 1 character.' },
                pattern: { value: '^(?!.+#.*).*$', errorMessage: '# is a special sign and can be used only to look for hashtags' },
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
          {itemList && itemList.length > 0 ? (
            ItemList(itemList)
          ) : (
            <div className="alert alert-warning">No Items found</div>
          )}
        </div>
        <div className={itemList && itemList.length > 0 ? '' : 'd-none'}>
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
  totalItems: item.totalItems
});

const mapDispatchToProps = {
  getEntities
};

const Checkbox = props => (
  <input type="checkbox" {...props} />
);

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

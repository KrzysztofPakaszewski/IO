import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs, Tab, Typography, Box, Grid} from '@material-ui/core';
import { Button } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { MatchingComponent } from './matching-component';
import { getCurrentlyLoggedUser } from 'app/modules/administration/user-management/user-management.reducer';

import { IRootState } from 'app/shared/reducers';
import { getLoggedUserMatches, acceptMatching } from './matching.reducer';
import { IMatching } from 'app/shared/model/matching.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { Chat } from '../matching/chat';

export interface IExchangeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IExchangeState{
  index: number
}

export class Exchange extends React.Component<IExchangeProps,IExchangeState> {
  constructor(props){
    super(props);
    this.state = {
      index: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.getLoggedUserMatches();
    this.props.getCurrentlyLoggedUser();
  }

  TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

  a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  handleChange(event,newIndex){
    this.setState({
      index: newIndex
    })
  }

  render() {
    const {matchingList,loggedUser} = this.props;
    return (
      <div>
        <h2 id="matching-heading">
          Exchanges in progress
        </h2>

        <div>
          {matchingList && matchingList.length > 0 ? (
            <Box
              style={{flexGrow: 1, display: 'flex'}}
            >
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={this.state.index}
                    onChange={this.handleChange}
                    aria-label="Vertical tabs"
                    style = {{borderRight: `1px solid`}}
                   >
                  {matchingList.map((item,index)=>(
                    <Tab key = {index} label={ item.offered.title } {...this.a11yProps(index)}/>
                    ))}
                  </Tabs>
                   {matchingList.map((item,iterator)=>(
                      <this.TabPanel key = {iterator} value={this.state.index} index={iterator}>
                        <Grid container
                          direction = "column"
                          justify = "space-between"
                          alignItems = "flex-start"
                        >
                          <Grid item>
                            {MatchingComponent(item,loggedUser)}
                          </Grid>

                          <Grid container
                            direction = "row"
                            justify= "space-evenly"
                            alignItems="flex-start"
                            >
                            <Grid item>
                              {item.received.title}
                            </Grid>
                            <Grid item>
                              <Button color="success" size="sm" onClick={(event)=>{
                                this.props.acceptMatching(item);
                              }}>
                                 <FontAwesomeIcon icon="check" /> <span className="d-none d-md-inline">You have received your item</span>
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button tag={Link} to={`/exchange/${item.id}/delete`} color="danger" size="sm">
                                <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Discard exchange</span>
                              </Button>
                            </Grid>
                            <Grid item>
                            <Button tag={Link} to={`/review/${item.received.owner.login}/add`} color="primary" size="sm">
                                <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">Add Review</span>
                              </Button>
                            </Grid>
                            <Grid item>
                                <Button tag={Link} to={`/exchange/${item.id}/chat`} color="warning" size="sm">
                                    <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">chat</span>
                                </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </this.TabPanel>
                    ))}
             </Box>
          ) : (
            <div className="alert alert-warning">No Matchings found</div>
          ) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  matchingList: storeState.matching.entities,
  loggedUser: storeState.userManagement.user
});

const mapDispatchToProps = {
  getLoggedUserMatches,
  getCurrentlyLoggedUser,
  acceptMatching
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exchange);

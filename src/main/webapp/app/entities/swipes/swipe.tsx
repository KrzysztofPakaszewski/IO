import React from 'react';
import { connect } from 'react-redux';
import Cards, { Card } from 'react-swipe-card';
import {RouteComponentProps} from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import {SingleCard} from './single-card';
import {addNewInterest} from "app/entities/search/search.reducer";
import {getRecommendedItems} from "app/entities/swipes/swipe.reducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface ISwipeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const CustomAlertLeft = () => (
  <span>
    <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Reject</span>
  </span>);
const CustomAlertRight = () => (
  <span>
    <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">Accept</span>
  </span>);



export class Swipe extends React.Component<ISwipeProps> {
  componentDidMount() {
    this.onLoad();
  }

  onLoad = () => {
    this.props.getRecommendedItems();
  };

  onEnd = () => {
    return (
      <div className="alert alert-warning">No recommended items found</div>
    )
  };



  onConfirm = (userItem, recommendedItem) => {
    addNewInterest(recommendedItem);
  };

  render() {
    const { itemList } = this.props;
    return (
     <div className="container">
        <div id="card-stack" />
       {itemList && itemList.length > 0 ? (
        <Cards
          alertRight={<CustomAlertRight />}
          alertLeft={<CustomAlertLeft />}
          onEnd={() => this.onEnd()}
        >
          {itemList.map((item) => {
            return (
              <Card
                key={item.id}
                onSwipeLeft={() => {}}
                onSwipeRight={() => { this.onConfirm(item[0], item[1]); }}
                className="master-root"
              >
                {SingleCard(item[0], item[1])}
              </Card>
            )})}
        </Cards>
         ) : (
         <div className="alert alert-warning">No recommended items found</div>
         )}
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  itemList: storeState.swipe.entities,
});

const mapDispatchToProps = {
  getRecommendedItems,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Swipe);

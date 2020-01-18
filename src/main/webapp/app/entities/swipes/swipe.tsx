import React from 'react';
import { connect } from 'react-redux';
import Cards, { Card } from 'react-swipe-card';
import {RouteComponentProps} from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import SingleCard from './single-card';
import { getRecommendedItems} from "app/entities/swipes/swipe.reducer";
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


  onConfirm = () => {
    this.props.getRecommendedItems();
  };

  onReject = () => {
    this.props.getRecommendedItems();
  };

  render() {
    const { itemList, match  } = this.props;
    return (
     <div className="container">
        <div id="card-stack" />
       {itemList && itemList.length > 0 ? (
        <Cards
          alertRight={<CustomAlertRight />}
          alertLeft={<CustomAlertLeft />}
          onEnd={() => this.onLoad()}
        >
          {itemList.map((item) => {
            return (
              <Card
                key={item.id}
                onSwipeLeft={() => { this.onReject(); }}
                onSwipeRight={() => { this.onConfirm(); }}
                className="master-root"
              >
                <SingleCard userItem={item} recommendedItem={item} expand={false} />
              </Card>
            )})}
        </Cards>
         ) : (
         <div className="alert alert-warning">No Items found</div>
         )}
      </div>
    );
  }
}

const mapStateToProps = ({ item }: IRootState) => ({
  itemList: item.entities,
});

const mapDispatchToProps = {
  getRecommendedItems
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Swipe);

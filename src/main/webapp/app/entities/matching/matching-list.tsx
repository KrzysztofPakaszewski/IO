import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ICrudGetAllAction } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getLoggedUserMatches } from './matching.reducer';
import { IMatching } from 'app/shared/model/matching.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import {MatchingComponent} from './matching-component';
import {Box} from '@material-ui/core';
import {Carousel,CarouselIndicators, CarouselItem,CarouselControl} from 'reactstrap';

export interface IMatchingListProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IMatchingListState{
  activeIndex: number
}



export class MatchingList extends React.Component<IMatchingListProps, IMatchingListState> {

  constructor(props){
    super(props);
    this.state= {
      activeIndex: 0
    }
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }
  componentDidMount() {
    this.props.getLoggedUserMatches();
  }

  next (){
    this.setState({
      activeIndex: (this.state.activeIndex + 1)% this.props.list.length
    });
  };

  previous(){
    this.setState({
      activeIndex: (this.state.activeIndex - 1)% this.props.list.length
    });
  };


  goToIndex = newIndex =>{
    this.setState({
      activeIndex: newIndex
    });
  };

  render() {
    const { list } = this.props;
    const {activeIndex} = this.state;
    return (
      <Box>
        <Carousel
          activeIndex = {activeIndex}
          next = {this.next}
          previous= {this.previous}
        >
          <CarouselIndicators items ={list} activeIndex={activeIndex} onClickHandler={this.goToIndex}/>
          {list.map((item)=>{
            return(
              <CarouselItem
                key = {item.id}
              >
                {MatchingComponent(item)}
              </CarouselItem>
            );
          })}
          <CarouselControl direction= 'next' directionText='Next' onClickHandler = {this.next}/>
          <CarouselControl direction= 'prev' directionText='Previous' onClickHandler = {this.previous}/>
        </Carousel>
      </Box>
    );
  }
}

const mapStateToProps = ({ matching }: IRootState) => ({
  list: matching.entities
});

const mapDispatchToProps = {
  getLoggedUserMatches
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchingList);

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ICrudGetAllAction } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getLoggedUserMatches, deleteEntity, acceptMatching } from './matching.reducer';
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
    this.agree = this.agree.bind(this);
    this.disagree = this.disagree.bind(this);
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
  agree(target){
    this.props.acceptMatching(target);
  };
  disagree(target){
    this.props.deleteEntity(target.id);
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
          interval = {false}
        >
          <CarouselIndicators items ={list} activeIndex={activeIndex} onClickHandler={this.goToIndex}/>
          {list.map((matching)=>{
            return(
              <CarouselItem
                key = {matching.id}
              >
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
  getLoggedUserMatches,
  deleteEntity,
  acceptMatching
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchingList);

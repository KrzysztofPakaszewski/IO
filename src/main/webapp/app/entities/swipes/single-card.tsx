import React, { Component } from 'react';
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import {connect} from "react-redux";
import {Item} from "app/entities/item/item";

export interface ISingleCardState extends StateProps{
  expand : boolean;
  userItem : Item;
  recommendedItem : Item;
}

class SingleCard extends Component<StateProps, ISingleCardState> {
  constructor(props) {
    super(props);
    this.state = {
      expand: props.expand,
      userItem: props.userItem,
      recommendedItem: props.recommendedItem,
    };
  }

  onClick(e) {
    e.preventDefault();
    this.setState({ expand: !this.state.expand });
  }

  render() {
    const { userItem, recommendedItem } = this.props;
    return (
      <div
        id="singleCard"
        className={
          this.state.expand
            ? 'expanded'
            : 'collapsed'}
        onClick={this.onClick.bind(this)}
      >
        <div>
          <Box>
            <Paper>
              {recommendedItem ?(
                <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center',padding:'3em'}}>
                  <Box>
                    <h3>Your Item</h3>
                    ItemCompMinimized(userItem)
                  </Box>
                  <h1>FOR </h1>
                  <Box>
                    <h3>Offered Item</h3>
                    ItemCompMinimized(recommendedItem)
                  </Box>
                </Box>
              ) : ' '}
            </Paper>
          </Box>
        </div>
      </div>

      );
  }
}

const mapStateToProps = (state) => ({
  userItem: state.userItem,
  recommendedItem: state.recommendedItem,
  expand: state.expand
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps
)(SingleCard);

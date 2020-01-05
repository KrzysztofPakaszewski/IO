import React, { useState } from 'react';

import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import ListElem from './list-item';

export interface IDrawerProps {
  closeDrawer: any;
  openDrawer: any;
  drawerOpened: boolean;
}

const useStyles= makeStyles({
  list: {
    width: 240,
    paddingTop: 50,
  },
});

const SideBar = (props: IDrawerProps) => {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      open={props.drawerOpened}
      onClose={props.closeDrawer}
      onOpen={props.openDrawer}
      >
      <div
        className={classes.list}
        role="presentation"
        onClick={props.closeDrawer}
        onKeyDown={props.closeDrawer}
      >
      <List>
        <ListElem icon="search" to="/search" text="search" key="search"/>
        <ListElem icon="asterisk" to="/item" text="your items" key="items"/>
        <ListElem icon="exchange-alt" to="/exchange" text="exchanges" key="exchange"/>
      </List>
      </div>
    </SwipeableDrawer>
  );
};

export default SideBar;

import './side-bar.scss';

import React, { useState } from 'react';

import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

import { Link } from 'react-router-dom';

import ListElem from './list-item';

export interface IDrawerProps {
  closeDrawer: func;
  drawerOpened: boolean;
}

const SideBar = (props: IDrawerProps) => {

  return (
    <Drawer
      className="drawer"
      variant="persistent"
      anchor="left"
      open={props.drawerOpened}
      classes={{
         paper: "drawerPaper",
      }}
      >
      <Button onClick={props.closeDrawer}>
        <FontAwesomeIcon icon="arrow-left"/>
      </Button>
      <List>
        <ListElem icon="search" to="/search" text="search" key="search"/>
        <ListElem icon="asterisk" to="/item" text="your items" key="items"/>
        <ListElem icon="exchange-alt" to="/exchange" text="exchanges" key="exchange"/>
      </List>
    </Drawer>
  );
};

export default SideBar;

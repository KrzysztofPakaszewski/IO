import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

export interface IListItem {
  icon: IconProp;
  to: string;
  text: string;
  id?: string;
}

export default class ListElem extends React.Component<IListItem> {
  render() {
    const { to, icon, id, text } = this.props;

    return (
      <ListItem button component={Link} to={to} key={id}>
        <ListItemIcon>
          <FontAwesomeIcon icon={icon} fixedWidth />
        </ListItemIcon>
        <ListItemText primary={text}/>
      </ListItem>
    );
  }
}

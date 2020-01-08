import './header.scss';

import React, { useState } from 'react';
import clsx from 'clsx';

import { Button, Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  toggleDrawer: any;
  openDrawer: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
  <div>
    <div id="app-header">
      <LoadingBar className="loading-bar" />
      <Navbar dark expand="sm" fixed="top"
        className="jh-navbar">
        {props.isAuthenticated &&
        <Button onClick= {props.toggleDrawer} id="drawerToggler">
          <FontAwesomeIcon icon = "bars"/>
        </Button>
        }
        <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
        <Brand />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ml-auto" navbar>
            <Home />
            {props.isAuthenticated && <EntitiesMenu />}
            {props.isAuthenticated && props.isAdmin && (
              <AdminMenu showSwagger={props.isSwaggerEnabled} showDatabase={!props.isInProduction} />
            )}
            <AccountMenu isAuthenticated={props.isAuthenticated} />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  </div>
  );
};

export default Header;

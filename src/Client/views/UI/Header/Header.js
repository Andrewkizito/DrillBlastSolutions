import React from 'react'
import Header from 'Client/components/Header/Header';
import './Header.css';

import classNames from 'classnames';
import LinksStyles from 'Client/assets/jss/material-kit-pro-react/components/headerLinksStyle';
import { List,ListItem,makeStyles } from '@material-ui/core';
import { Link, withRouter } from "react-router-dom";

const useStyles = makeStyles(LinksStyles);

const BlastHeader = (props) => {
    const pathname = props.location.pathname;

    const classes = useStyles()
    return (
        <Header 
           brand={
            <div className="Logo-Box">
             <img src={require('../../../assets/images/logo.png')} className="Logo"/>
             <p>Drill Blast Solutions</p>
            </div>}
           color="white"
           absolute
           links={
               <List className={classes.list + " " + classes.mlAuto}>
                  <ListItem className={classes.listItem}>
                    <Link to="/" className={pathname === '/' ? classNames('navLink','navLinkActive') : 'navLink' }>Home</Link>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Link to="/refer_and_earn" className={pathname === '/refer_and_earn' ? classNames('navLink','navLinkActive') : 'navLink'}>Refer And Earn</Link>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Link to="/contact-us" className={pathname === '/contact-us' ? classNames('navLink','navLinkActive') : 'navLink' }>Contact Us</Link>
                  </ListItem>
               </List>
           }/>
    )
}

export default withRouter(BlastHeader);

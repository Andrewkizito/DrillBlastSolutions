import React from 'react';

import styles from 'Client/assets/jss/material-kit-pro-react/components/footerStyle';
import { List,ListItem } from '@material-ui/core';
import Button from 'Client/components/CustomButtons/Button';
import Footer from "Client/components/Footer/Footer";

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(styles);

const BlastFooter = () => {
    const classes = useStyles();
    return (
        <Footer
          theme="dark"
          content={
            <div>
              <div className={classes.left}>
                <a href="#" className={classes.footerBrand}>
                  Drill Blast Solutions
                </a>
              </div>
              <div className={classes.pullCenter}>
                <List className={classes.list}>
                   <ListItem className={classes.inlineBlock}>
                      <p className={classes.block}>Copyright &copy; Drill Blast Solutions {new Date().getFullYear()}</p>
                   </ListItem>
                </List>
              </div>
              <div className={classes.rightLinks}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a href="/" style={{marginLeft: "1rem"}} target="_blank" className={classes.block}>
                      Home
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a href="/refer_and_earn" style={{marginLeft: "1rem"}} target="_blank" className={classes.block}>
                      Refer And Earn
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a href="/contact-us" style={{marginLeft: "1rem"}} onClick={e => e.preventDefault()} className={classes.block}>
                      Contact Us
                    </a>
                  </ListItem>
                </List>
              </div>
            </div>
          }
        />
    )
}

export default BlastFooter;
import React, { useState } from 'react';

import '../Refer_Earn.css';
import GridContainer from 'Client/components/Grid/GridContainer';
import GridItem from 'Client/components/Grid/GridItem';

import Button from 'Client/components/CustomButtons/Button';
import data from './data.json';
import aboutUsStyle from "Client/assets/jss/material-kit-pro-react/views/aboutUsStyle.js";
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
import { MailOutline } from '@material-ui/icons';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

const useStyles = makeStyles(aboutUsStyle);

const About = () => {
    const [ info ] = useState(data.data);
    const [ single,setSingle ] = useState(null);
    const useStyles = makeStyles(aboutUsStyle);
    const classes = useStyles();

    return (
        <div className="About-Refer">
        {!single ? 
          <>
            <h3>Who is eligible</h3>
            <p>Everyone is elgible to the refer and earn service, you just need to choose the right category , since we always have a place for everyone.</p>
            <GridContainer>
              <GridItem xs={4} sm={4} md={4}>
                <div className="Category-Box">
                  <h1>1</h1>
                  <h4 style={{paddingBottom: "1.2rem"}}>For Individuals</h4>
                  <Button color="facebook" round onClick={() => setSingle(info[0])}>Discover More</Button>
                </div>
              </GridItem>
              <GridItem xs={4} sm={4} md={4}>
                <div className="Category-Box">
                  <h1>2</h1>
                  <h4 style={{paddingBottom: "1.2rem"}}>For Business Brokers and agents only</h4>
                  <Button color="facebook" round onClick={() => setSingle(info[1])}>Discover More</Button>
                </div>
              </GridItem>
              <GridItem xs={4} sm={4} md={4}>
                <div className="Category-Box">
                  <h1>3</h1>
                  <h4>For Ceo's , Board Members, MD's, GM's,Senior Management, Companies and Cooparations.</h4>
                  <Button color="facebook" round onClick={() => setSingle(info[2])}>Discover More</Button>
                </div>
              </GridItem>
            </GridContainer>
          </> : 
          <ScrollAnimation animateIn="slideInDown" duration={3}>
            <div>
              <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                  <h4 className={classNames(classes.title, classes.textCenter)}>{single.title}</h4>
                  <p>{single.detail}</p>
                  <div className="Nav-Buttons">
                    <Button style={{float: "right"}} simple color="google" href="/contact-us"><MailOutline/> For more details and information, contact us.</Button>
                    <Button color="facebook" simple onClick={() => setSingle(null)}>Back</Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>}
        </div>
    )
}

export default About;

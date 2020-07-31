import React from 'react';

import './Explore.css';
import GridContainer from 'Client/components/Grid/GridContainer';
import GridItem from 'Client/components/Grid/GridItem';
import Button from 'Client/components/CustomButtons/Button';
import styles from "Client/assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.js";
import { makeStyles } from '@material-ui/core';
import style from 'Client/assets/jss/material-kit-pro-react/rotatingCards';
import Card from 'Client/components/Card/Card';
import CardBody from 'Client/components/Card/CardBody';

import img from '../../../../assets/images/1.jpg';
import img2 from '../../../../assets/images/2.jpg';
import img3 from '../../../../assets/images/3.jpg'
import img5 from '../../../../assets/images/5.jpg'
import img7 from '../../../../assets/images/7.jpg'

const useStyles = makeStyles(style);

const Explore = () => {
    const classes = useStyles();
    return (
        <div className="Explore">
            <h3>Explore What We Do.</h3>
            <GridContainer>
              <GridItem xs={12} sm={4} md={4}>
                <Card background style={{ backgroundImage: `url(${img})` }}>
                  <CardBody background>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <h3 className={classes.cardTitleWhite}>
                        Lower Your Operating Costs
                      </h3>
                    </a>
                    <Button round color="facebook">
                      Discover More
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Card background style={{ backgroundImage: `url(${img2})` }}>
                  <CardBody background>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <h3 className={classes.cardTitleWhite}>
                        Increase Your Business.
                      </h3>
                    </a>
                    <Button round color="facebook">
                      Discover More
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Card background style={{ backgroundImage: `url(${img3})` }}>
                  <CardBody background>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <h3 className={classes.cardTitleWhite}>
                        We Save Your Money.
                      </h3>
                    </a>
                    <Button round color="facebook">
                      Discover More
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Card background style={{ backgroundImage: `url(${img})` }}>
                  <CardBody background>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <h3 className={classes.cardTitleWhite}>
                        Our gaurantee,no save,no pay
                      </h3>
                    </a>
                    <Button round color="facebook">
                      Discover More
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Card background style={{ backgroundImage: `url(${img5})` }}>
                  <CardBody background>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <h3 className={classes.cardTitleWhite}>
                       Refer and earn
                      </h3>
                    </a>
                    <Button round color="facebook">
                      Discover More
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <Card background style={{ backgroundImage: `url(${img})` }}>
                  <CardBody background>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <h3 className={classes.cardTitleWhite}>
                       We find your lost opportunities
                      </h3>
                    </a>
                    <Button round color="facebook">
                      Discover More
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
        </div>
    )
}

export default Explore

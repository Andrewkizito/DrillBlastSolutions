import React, { useEffect, useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Icon2 from "react-icons-kit/Icon";

// @material-ui/icons
import Update from "@material-ui/icons/Update";
import { database } from "react-icons-kit/fa/database"
import { newspaperO } from "react-icons-kit/fa/newspaperO"
import { book } from "react-icons-kit/fa/book";

// core components
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardIcon from "../../../components/Card/CardIcon.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";

import styles from "../../../assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

import Axios from "axios";
import Loading from "admin/blast/views/UI/Loading/Loading.js";
import Notification from "admin/blast/views/UI/Notification/Notification.js";
import Database from "./Database/Database.js";
import Newsletter from "../UI/NewsLetter/Newsletter.js";
import WelcomeText from "../UI/WelcomeText/WelcomeText.js";


const useStyles = makeStyles(styles);

const Dashboard = () => {
  const [ dataAvailable,setData ] = useState({data: null,loading: false,error: null,databaseSize: null});
  const classes = useStyles();
  useEffect(() => {
    setData({data: null,loading: true,error: null,databaseSize: null});
    Axios.get('https://jvhr9wef76.execute-api.us-west-2.amazonaws.com/prod/resources/describe-tables')
    .then(res => {
        if(!res.data.error){
          let dbSize = 0;
          const data = res.data.data;
          data.forEach(d => {
            dbSize = dbSize + d.TableSizeBytes
          });
          setData({data: data,loading: false,error: null,databaseSize: dbSize});
        } else {
          setData({data: null,loading: false,error: res.data.error});
        }
    })
    .catch(err => setData({data: null,loading: false,error: err.message}))
  },[])

  return (
    <div>
      { dataAvailable.loading && <Loading text="Loading Data, Wait A second"/> }
      { dataAvailable.error && <Notification color="danger" text={dataAvailable.error}/> }
      <GridContainer>
        { dataAvailable.data &&
        <>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
              <Icon2 icon={database}/>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                {(dataAvailable.databaseSize / 1000).toFixed(2)} <small>KB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
      </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Slides Created</p>
              <h3 className={classes.cardTitle}>{dataAvailable.data[0].ItemCount} <small>Created</small></h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon2 icon={newspaperO}/>
              </CardIcon>
              <p className={classes.cardCategory}>News Articles</p>
              <h3 className={classes.cardTitle}>{dataAvailable.data[1].ItemCount} <small>Published</small></h3>
            </CardHeader>
            <CardFooter stats>
            <div className={classes.stats}>
              <Update />
              Just Updated
            </div>
          </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
        <Card>
          <CardHeader color="info" stats icon>
            <CardIcon color="info">
              <Icon2 icon={book}/>
            </CardIcon>
            <p className={classes.cardCategory}>Resources</p>
            <h3 className={classes.cardTitle}>{dataAvailable.data[2].ItemCount} <small>Uploaded</small></h3>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <Update />
              Just Updated
            </div>
          </CardFooter>
        </Card>
      </GridItem>
        </> }
      </GridContainer>
      {dataAvailable.data && <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="success">
                <Icon2 icon={database}/>
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Status Of Databases
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify="space-between">
               { dataAvailable.data.map(db => <Database key={Math.random()} db={db}/>) }
              </GridContainer>
              <hr/>
              <WelcomeText/>
              <hr/>
              <Newsletter/>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>}
    </div>
  );
}

export default Dashboard;

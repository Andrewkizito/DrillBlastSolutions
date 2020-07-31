/*eslint-disable*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components used to create a google map
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import PinDrop from "@material-ui/icons/PinDrop";
import Phone from "@material-ui/icons/Phone";
import BusinessCenter from "@material-ui/icons/BusinessCenter";
// core components
import GridContainer from "Client/components/Grid/GridContainer.js";
import GridItem from "Client/components/Grid/GridItem.js";
import InfoArea from "Client/components/InfoArea/InfoArea.js";
import CustomInput from "Client/components/CustomInput/CustomInput.js";
import Button from "Client/components/CustomButtons/Button.js";
import './Contact.css';

import contactUsStyle from "Client/assets/jss/material-kit-pro-react/views/contactUsStyle.js";
import { TextField } from "@material-ui/core";
import BlastHeader from "../UI/Header/Header";
import BlastFooter from "../UI/Footer/Footer";
const useStyles = makeStyles(contactUsStyle);


const Contact = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  return (
    <>
      <BlastHeader/>
      <div>
        <div className="Contact">
          <div className="Welcome-Box">
            <p>We are always open to any inquiries incase<br/> 
              something is unclear we shall be glad to get<br/> 
              back to you in a very short period of time.</p>
          </div>
        </div>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.contactContent}>
            <div className={classes.container}>
              <h2 className={classes.title}>Send us a message</h2>
              <GridContainer>
                <GridItem md={6} sm={6}>
                  <p>
                    You can contact us with anything related to our Products. We
                    {"'"}ll get in touch with you as soon as possible.
                    <br />
                    <br />
                  </p>
                  <form>
                    <TextField fullWidth color="primary" label="Your Name" margin="dense"/>
                    <TextField fullWidth color="primary" label="Phone" margin="dense"/>
                    <TextField fullWidth color="primary" label="Subject" margin="dense"/>
                    <CustomInput
                      labelText="Your message"
                      id="float"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 6
                      }}
                    />
                    <div className={classes.textCenter}>
                      <Button color="facebook" round>
                        Contact us
                      </Button>
                    </div>
                  </form>
                </GridItem>
                <GridItem md={4} sm={4} className={classes.mlAuto}>
                  <InfoArea
                    className={classes.info}
                    title="Find us at the office"
                    description={
                      <p>
                        Kangaroo way,<br/>
                        7652 Adelaide,<br/>
                        Australia
                      </p>
                    }
                    icon={PinDrop}
                    iconColor="danger"
                  />
                  <InfoArea
                    className={classes.info}
                    title="Give us a ring"
                    description={
                      <p>
                        Kevin<br/>
                        +40 762 321 762<br/>
                        Mon - Fri, 8:00-22:00
                      </p>
                    }
                    icon={Phone}
                    iconColor="success"
                  />
                  <InfoArea
                    className={classes.info}
                    title="Legal Information"
                    description={
                      <p>
                        Creative Tim Ltd. <br /> VAT · EN2341241 <br /> IBAN ·
                        EN8732ENGB2300099123 <br /> Bank · Great Britain Bank
                      </p>
                    }
                    icon={BusinessCenter}
                    iconColor="primary"
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
      <BlastFooter/>
    </>
  );
}

export default Contact;

import React from 'react';

import GridContainer from 'Client/components/Grid/GridContainer';
import GridItem from 'Client/components/Grid/GridItem';

import './AboutUs.css';
import { Info,ThumbUp,WorkOutline } from '@material-ui/icons';

const AboutUs = () => {
    return (
        <div className="AboutUs">
            <h4>Drillblast Solutions Simply Better</h4>
            <GridContainer>
               <GridItem sm={4} md={4} className="About-Box">
                 <Info style={{ fontSize: 40 }}/>
                 <h5>Who Are We</h5>
                 <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                  Culpa aliquam natus dicta, voluptas eos qui odio, necessitatibus 
                  ea dolorum incidunt fugiat neque expedita magnam, provident 
                  quasi magni placeat saepe animi!</p>
               </GridItem>
               <GridItem sm={4} md={4} className="About-Box">
                 <WorkOutline style={{ fontSize: 40 }}/>
                 <h5>What We Do</h5>
                 <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                  Culpa aliquam natus dicta, voluptas eos qui odio, necessitatibus 
                  ea dolorum incidunt fugiat neque expedita magnam, provident 
                  quasi magni placeat saepe animi!</p>
               </GridItem>
               <GridItem sm={4} md={4} className="About-Box">
                 <ThumbUp style={{ fontSize: 40 }}/>
                 <h5>Simply The Best</h5>
                 <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                  Culpa aliquam natus dicta, voluptas eos qui odio, necessitatibus 
                  ea dolorum incidunt fugiat neque expedita magnam, provident 
                  quasi magni placeat saepe animi!</p>
               </GridItem>
            </GridContainer> 
        </div>
    )
}

export default AboutUs;

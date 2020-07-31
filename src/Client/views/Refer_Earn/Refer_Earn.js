import React from 'react'
import About from './About/About';
import BlastHeader from "../UI/Header/Header";
import BlastFooter from "../UI/Footer/Footer";
import './Refer_Earn.css';

const Refer_Earn = () => {
    return (
      <>
        <BlastHeader/>
        <div className="Refer-Box">
          <div className="Text-Box">
            <h3>Refer and Earn</h3>
            <p>Drill Blast Solutions pride ourselves on providing excellent services. 
               When it comes to marketing our services and passing onto others how great 
               our work and services we do. We feel there is no better way than let you 
               share in the journey with you. Through our partnership with non related 
               others we are able to give to you as a Refer and Earn Program.
            </p>
          </div>
        </div>
        <About/>
        <BlastFooter/>
      </>
    )
}

export default Refer_Earn;

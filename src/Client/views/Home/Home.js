import React, { useEffect, useState } from 'react';

import './Home.css';
import AboutUs from './Sections/AboutUs/AboutUs';
import Explore from './Sections/Explore/Explore';

import BlastHeader from "../UI/Header/Header";
import BlastFooter from "../UI/Footer/Footer";
import Axios from 'axios';
import Loading from 'admin/blast/views/UI/Loading/Loading';
import Notification from 'admin/blast/views/UI/Notification/Notification';

const Home = () => {
    const [ banner,setBanner ] = useState(null);
    const [ ui,setUi ] = useState({loading: null,error: null});
    useEffect(() => {
      setUi({loading: true,error: false});
      Axios.get('https://jhjffbgkva.execute-api.ap-southeast-2.amazonaws.com/prod/home-banner')
      .then(res => {
        if(!res.data.error){
          setBanner(res.data.data);
          setUi({loading: false,error: null});
        } else {
          setUi({loading: false,error: res.data.error});
        }
      }).catch(err => setUi({loading: false,error: err.message}));
    }, []);
    return (
      <>
        <BlastHeader/>
        { ui.loading && <Loading/> }
        { ui.error && <Notification text={ui.error} color="Danger"/> }
        {banner &&
        <div className="Home" style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.397),rgba(0, 0, 0, 0.376)),url(${banner.url})`,
          backgroundSize: "cover",backgroundPosition: "center",backgroundAttachment: "fixed"}}>
          <h4>{banner.title}</h4>  
        </div> }
        <Explore/>
        <AboutUs/>
        <BlastFooter/>
      </>
    )
}

export default Home;

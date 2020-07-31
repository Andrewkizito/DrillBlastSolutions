import React from 'react';

import { BrowserRouter, Route,Switch } from 'react-router-dom';

import Home from 'Client/views/Home/Home';
import Refer_Earn from 'Client/views/Refer_Earn/Refer_Earn';
import Contact from 'Client/views/Contact/Contact';
import Admin from 'admin/index';

const ClientRoot = () => {
    return (
      <BrowserRouter>
        <>
        <Switch>
            <Route path="/admin" component={Admin}/>
            <Route path="/contact-us" component={Contact}/>
            <Route path="/refer_and_earn" component={Refer_Earn}/>
            <Route path="/" component={Home}/>
          </Switch>
        </>
      </BrowserRouter>
    )
}

export default ClientRoot;

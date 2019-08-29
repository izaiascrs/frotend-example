import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login'
import Details from './pages/Details'

export default function Routes() {
    return(
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/details/:platform/:username" component={Details} />
        </BrowserRouter>
    );

}
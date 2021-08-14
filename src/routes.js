import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components 
//import Home from './components/index';
import Header from './components/header';
import Login from './components/user/login';
import Register from './components/user/register';
import Libraries from './components/libraries.js';
import Home from './components/home.js';
import './index';


const Routes = () => (
    
    <BrowserRouter>
        <Header/>
        <main role="main" className="container">
            <Switch>
                <Route exact path= "/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path= "/libraries" component={ Libraries }/>
            </Switch>
        </main>
    </BrowserRouter>
    )

export default Routes;
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components 
import Home from './components/index';
import Header from './components/header';
import Footer from './components/footer';
import Libraries from './components/libraries/libraries';
import Login from './components/user/login';

const Routes = () => (
    <BrowserRouter>
        <Header/>
        <main role="main" className="container">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/libraries" component={Libraries}/>
                <Route exact path="/login" component={Login}/>
            </Switch>
        </main>
    </BrowserRouter>
)

export default Routes;
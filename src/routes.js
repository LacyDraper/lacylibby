import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components 
//import Home from './components/index';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/user/login';
import Register from './components/user/register';


const Routes = () => (
    
    <BrowserRouter>
        <Header/>
        <main role="main" className="container">
            <Switch>
                
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                
            </Switch>
        </main>
    </BrowserRouter>
    )

export default Routes;
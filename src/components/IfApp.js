import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './common/privateRoute';

import welcome from './common/welcome';
import login from './common/login';
import Dashboard from './common/dashboard';

class IfApp extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={welcome} />
                    <Route path="/login" component={login} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        );
    }
}

export default IfApp;
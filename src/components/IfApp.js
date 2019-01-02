import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './common/privateRoute';

import login from './common/login';
import Dashboard from './common/dashboard';

class IfApp extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={login} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        );
    }
}

export default IfApp;
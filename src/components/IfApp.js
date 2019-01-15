import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './common/privateRoute';

import nonauthorized from './common/nonauthorized';
import dashboard from './common/dashboard';

class IfApp extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <PrivateRoute path="/dashboard" component={dashboard} />
                    <Route path="/" component={nonauthorized} />
                </Switch>
            </Router>
        );
    }
}

export default IfApp;
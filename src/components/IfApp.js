import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './common/privateRoute';

import nonauthorized from './nonauthorized/nonauthorizedContainer';
import authorized from './authorized/authorizedContainer';

class IfApp extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <PrivateRoute path="/auth" component={authorized} />
                    <Route path="/" component={nonauthorized} />
                </Switch>
            </Router>
        );
    }
}

export default IfApp;
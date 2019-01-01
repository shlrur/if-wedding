import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HaveToLogin from './common/haveToLogin';
import Dashboard from './common/dashboard';

class IfApp extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={HaveToLogin} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                </Switch>
            </Router>
        );
    }
}

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => {
                fakeAuth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }}
        />
    );
}

export default IfApp;
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
    render() {
        const { component: Component, ...props } = this.props;

        if (this.props.isChecked) {
            return (
                <Route
                    {...props}
                    render={(props) =>
                        (this.props.user ? <Component {...props} /> : <Redirect to="/login" />)
                    }
                />
            );
        } else {
            return (
                <div>
                    loading...
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    user: state.authentication.user,
    isChecked: state.authentication.isChecked
})

export default connect(
    mapStateToProps
)(PrivateRoute)
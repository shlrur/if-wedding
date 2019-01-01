import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, logout } from '../../redux/actions/authentication';

class Authentication extends Component {
    render() {
        return (
            <div>
                <button onClick={this.onAuthenticationHandle.bind(this)}>
                    {this.props.user ? 'Logout' : 'Login'}
                </button>
                User: {this.props.user ? this.props.user.displayName : 'none'}
            </div>
        );
    }

    onAuthenticationHandle() {
        if(this.props.user) {
            this.props.logout();
        } else {
            this.props.login();
        }
    }
}

const mapStateToProps = state => ({
    loggedIn: state.login.loggedIn,
    user: state.login.user
})
const mapDispatchToProps = {
    login,
    logout
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Authentication)
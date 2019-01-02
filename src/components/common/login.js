import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, logout } from '../../redux/actions/authentication';

class Authentication extends Component {
    render() {
        let jsx;
        
        if (this.props.isChecked) {
            jsx = (
                <div>
                    <button onClick={this.onAuthenticationHandle.bind(this)}>
                        {this.props.user ? 'Logout' : 'Login'}
                    </button>
                    User: {this.props.user ? this.props.user.displayName : 'none'}
                </div>
            );
        } else {
            jsx = (
                <div>
                    loading...
                </div>
            );
        }
        return jsx;
    }

    onAuthenticationHandle() {
        if (this.props.user) {
            this.props.logout();
        } else {
            this.props.login();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.user) {
            this.props.history.push('/dashboard');
        }
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    user: state.authentication.user,
    isChecked: state.authentication.isChecked
})
const mapDispatchToProps = {
    login,
    logout
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Authentication)
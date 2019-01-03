import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, logout } from '../../redux/actions/authentication';

class Authentication extends Component {
    render() {
        let jsx;

        if (this.props.isChecked) {
            return (
                <div>
                    <button onClick={()=>{this.props.login('google')}}>google</button>
                    <button onClick={()=>{this.props.login('facebook')}}>facebook</button>
                    <button onClick={()=>{this.props.login('twitter')}}>twitter</button>
                    <button onClick={()=>{this.props.login('github')}}>github</button>
                    {/* User: {this.props.user ? this.props.user.displayName : 'none'} */}
                </div>
            );
        }

        return (
            <div>
                loading...
            </div>
        );


    }

    onAuthenticationHandle(providerName) {
        console.log(providerName);
        
            // this.props.login();
        
    }

    shouldComponentUpdate(nextProps, nextStates) {
        if (nextProps.loggedIn) {
            this.props.history.push('/dashboard');
        }

        return true;
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
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
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, logout } from '../../redux/actions/authentication';

class Authentication extends Component {
    render() {
        let jsx;

        if (this.props.isChecked) {
            return (
                <div className="container text-center login">
                    <h4 className="my-4">Start with</h4>
                    <div className="row mt-4">
                        <div className="col-md-3">
                            <button id="google" className="btn login-btn" />
                            <h4 className="mt-4">Google</h4>
                            <p>login with google</p>
                        </div>
                        <div className="col-md-3">
                            <button id="facebook" className="btn login-btn" />
                            <h4 className="mt-4">Facebook</h4>
                            <p>login with facebook</p>
                        </div>
                        <div className="col-md-3">
                            <button id="twitter" className="btn login-btn" />
                            <h4 className="mt-4">Twitter</h4>
                            <p>login with twitter</p>
                        </div>
                        <div className="col-md-3">
                            <button id="github" className="btn login-btn" />
                            <h4 className="mt-4">Github</h4>
                            <p>login with twitter</p>
                        </div>
                    </div>
                </div>
                // <div>
                //     <button onClick={() => { this.props.login('google') }}>google</button>
                //     <button onClick={() => { this.props.login('facebook') }}>facebook</button>
                //     <button onClick={() => { this.props.login('twitter') }}>twitter</button>
                //     <button onClick={() => { this.props.login('github') }}>github</button>
                //     {/* User: {this.props.user ? this.props.user.displayName : 'none'} */}
                // </div>
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
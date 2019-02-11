import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from '../../redux/actions/authentication';

class Authentication extends Component {
    render() {
        return (
            <div className="container text-center login">
                <h4 className="my-4">Start with</h4>
                <div className="row mt-4">
                    <div className="col-md-3">
                        <button id="google" className="btn login-btn" onClick={() => { this.props.login('google'); }} />
                        <h4 className="mt-4">Google</h4>
                        <p>login with google</p>
                    </div>
                    <div className="col-md-3">
                        <button id="facebook" className="btn login-btn" onClick={() => { this.props.login('facebook'); }} />
                        <h4 className="mt-4">Facebook</h4>
                        <p>login with facebook</p>
                    </div>
                    <div className="col-md-3">
                        <button id="twitter" className="btn login-btn" onClick={() => { this.props.login('twitter'); }} />
                        <h4 className="mt-4">Twitter</h4>
                        <p>login with twitter</p>
                    </div>
                    <div className="col-md-3">
                        <button id="github" className="btn login-btn" onClick={() => { this.props.login('github'); }} />
                        <h4 className="mt-4">Github</h4>
                        <p>login with twitter</p>
                    </div>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = {
    login
};

export default connect(
    null,
    mapDispatchToProps
)(Authentication);
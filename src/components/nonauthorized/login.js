import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from '../../redux/actions/authentication';

class Authentication extends Component {
    render() {
        return (
            <div className="container login">
                <h4 className="my-4 text-center">Start with</h4>
                <ul className="row">
                    <li className="col-md-3">
                        <div id="google" className="btn login-btn" onClick={() => { this.props.login('google'); }}></div>
                    </li>
                    <li className="col-md-3">
                        <div id="facebook" className="btn login-btn" onClick={() => { this.props.login('facebook'); }}></div>
                    </li>
                    <li className="col-md-3">
                        <div id="twitter" className="btn login-btn" onClick={() => { this.props.login('twitter'); }}></div>
                    </li>
                    <li className="col-md-3">
                        <div id="github" className="btn login-btn" onClick={() => { this.props.login('github'); }}></div>
                    </li>
                </ul>
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
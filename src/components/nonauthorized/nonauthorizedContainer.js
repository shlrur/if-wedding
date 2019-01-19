import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import welcome from './welcome';
import contactus from './contactus';
import login from './login';

class NonAuthorizedContainer extends Component {
    render() {
        if (this.props.isChecked) {
            return (
                <div className="unauthorized">
                    <div className="cover-container welcome-background text-center d-flex w-100 h-100 p-3 mx-auto flex-column">
                        <header className="masthead mb-auto">
                            <div className="inner">
                                <h3 className="masthead-brand">If Wedding</h3>
                                <nav className="nav nav-masthead justify-content-center">
                                    <Link className={"nav-link " + (this.props.location.pathname === '/' ? 'active' : '')} to={`${this.props.match.url}`}>Welcome</Link>
                                    {/* <Link className="nav-link " to={`${this.props.match.url}`}>Features</Link> */}
                                    <Link className={"nav-link " + (this.props.location.pathname.indexOf('contactus') !== -1 ? 'active' : '')} to={`${this.props.match.url}contactus`}>Contact</Link>
                                    <Link className={"nav-link " + (this.props.location.pathname.indexOf('login') !== -1 ? 'active' : '')} to={`${this.props.match.url}login`}>Sign up&in</Link>
                                </nav>
                            </div>
                        </header>
    
                        <Route exact path={`${this.props.match.url}`} component={welcome} />
                        <Route exact path={`${this.props.match.url}contactus`} component={contactus} />
                        <Route exact path={`${this.props.match.url}login`} component={login} />
    
                        <footer className="mastfoot mt-auto">
                            <div className="inner">
                                <p>ing... <a href="">Ing</a>, by <a href="">@ing...</a>.</p>
                            </div>
                        </footer>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    loading...
                </div>
            );
        }
    }

    shouldComponentUpdate(nextProps, nextStates) {
        if (nextProps.loggedIn) {
            this.props.history.push('/auth/dashboard');
        }

        return true;
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    isChecked: state.authentication.isChecked
})

export default connect(
    mapStateToProps
)(NonAuthorizedContainer)
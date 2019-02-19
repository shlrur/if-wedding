import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import i18n from '../../i18n/i18n';

import welcome from './welcome';
import contactus from './contactus';
import login from './login';

class NonAuthorizedContainer extends Component {
    render() {
        if (this.props.isChecked) {
            return (
                <div className="unauthorized">
                    <div className="cover-container welcome-background text-center d-flex w-100 h-100 p-3 mx-auto flex-column">
                        <header className="masthead">
                            <div className="inner">
                                <span className="masthead-brand">If Wedding</span>
                                <nav className="nav nav-masthead justify-content-center menu-bar">
                                    <Link className={`nav-link ${(this.props.location.pathname === '/' ? 'active' : '')}`} to={`${this.props.match.url}`}>Welcome</Link>
                                    <Link className={`nav-link ${(this.props.location.pathname.indexOf('contactus') !== -1 ? 'active' : '')}`} to={`${this.props.match.url}contactus`}>Contact</Link>
                                    <Link className={`nav-link ${(this.props.location.pathname.indexOf('login') !== -1 ? 'active' : '')}`} to={`${this.props.match.url}login`}>{i18n.t('label.signIn')}</Link>
                                </nav>
                            </div>
                        </header>

                        <Route exact path={`${this.props.match.url}`} component={welcome} />
                        <Route path={`${this.props.match.url}contactus`} component={contactus} />
                        <Route path={`${this.props.match.url}login`} component={login} />

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

    shouldComponentUpdate(nextProps) {
        if (nextProps.loggedIn) {
            this.props.history.push('/auth/dashboards');
        }

        return true;
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    isChecked: state.authentication.isChecked
});

export default connect(
    mapStateToProps
)(NonAuthorizedContainer);
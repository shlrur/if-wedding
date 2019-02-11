import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import {
    logout
} from '../../redux/actions/authentication';

import Dashboards from './dashboard/dashboards';
import Preview from './preview';
import WeddingInformation from './weddingInform';

class AuthorizedContainer extends Component {
    render() {
        if (this.props.isChecked) {
            const mainMenus = [
                {
                    alias: 'Dashboards',
                    link: '/auth/dashboards'
                }, {
                    alias: 'Preview',
                    link: '/auth/preview'
                }
            ];

            return (
                <div className="authorized-container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand">If Wedding</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse navbar-contents" id="navbarNav">
                            <ul className="navbar-nav">
                                {mainMenus.map((menu, ind) => {
                                    return <li className={`nav-item ${(this.props.location.pathname === menu.link ? 'active' : '')}`} key={ind}>
                                        <Link className="nav-link" to={menu.link}>
                                            {menu.alias}
                                            {this.props.location.pathname === menu.link ? <span className="sr-only">(current)</span> : ''}
                                        </Link>
                                    </li>;
                                })}
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Settings
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-lg-right" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/auth/settings/weddinginform">
                                            Wedding Information
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" >Withdraw</a>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => { this.props.logout(); }}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <Route exact path={`${this.props.match.url}/dashboards`} component={Dashboards} />
                    <Route exact path={`${this.props.match.url}/preview`} component={Preview} />
                    <Route exact path={`${this.props.match.url}/settings/weddinginform`} component={WeddingInformation} />
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

    getDashboard() {
        this.props.getDashboardRequest();
    }
}
const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn,
    isChecked: state.authentication.isChecked,
    dashboard: state.dashboard.dashboard
});
const mapDispatchToProps = {
    logout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizedContainer);
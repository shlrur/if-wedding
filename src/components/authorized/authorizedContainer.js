import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import i18n from '../../i18n/i18n';

import {
    logout
} from '../../redux/actions/authentication';

import Dashboards from './dashboard/dashboards';
import Preview from './preview';
import WeddingInformation from './settings/weddingInform';

class AuthorizedContainer extends Component {
    render() {
        if (this.props.isChecked) {
            const mainMenus = [
                {
                    alias: i18n.t('auth.dashboard'),
                    link: '/auth/dashboards'
                }, {
                    alias: i18n.t('auth.preview'),
                    link: '/auth/preview'
                }
            ];

            return (
                <div className="authorized-container">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand">HANA</a>
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
                                        {i18n.t('auth.settings')}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-lg-right" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/auth/settings/weddinginform">
                                            {i18n.t('auth.weddingInformation')}
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" >{i18n.t('auth.withdraw')}</a>
                                    </div>
                                </li>
                                <li className="nav-item logout">
                                    <a className="nav-link" onClick={() => { this.props.logout(); }}>{i18n.t('auth.logout')}</a>
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
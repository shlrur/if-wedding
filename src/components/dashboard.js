import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    getDashboardRequest
} from '../redux/actions/dashboard';

import Authentication from './authentication';
import WidgetContainer from './widgetContainer';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Authentication />
                <button onClick={this.getDashboard.bind(this)}>
                    get Dashboard
                </button>
                <WidgetContainer />
            </div>
        );
    }

    getDashboard() {

    }
}

const mapStateToProps = state => ({
    dashboard: state.dashboard.dashboard
})
const mapDispatchToProps = {
    getDashboardRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
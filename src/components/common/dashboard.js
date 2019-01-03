import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    getDashboardRequest
} from '../../redux/actions/dashboard';
import {
    logout
} from '../../redux/actions/authentication';

import WidgetContainer from './widgetContainer';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <button onClick={()=>{this.props.logout()}}>
                    logout
                </button>
                <button onClick={this.getDashboard.bind(this)}>
                    get Dashboard
                </button>
                <WidgetContainer />
            </div>
        );
    }

    getDashboard() {
        this.props.getDashboardRequest();
    }
}

const mapStateToProps = state => ({
    dashboard: state.dashboard.dashboard
})
const mapDispatchToProps = {
    getDashboardRequest,
    logout
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
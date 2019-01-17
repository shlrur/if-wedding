import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    getDashboardRequest
} from '../../redux/actions/dashboard';
import {
    logout
} from '../../redux/actions/authentication';

import WidgetGallery from './widgetGallery';

class Dashboard extends Component {
    render() {
        return (
            <div>
                {/* <button onClick={this.getWidgetTypes.bind(this)}>
                    get widget types
                </button>
                <button onClick={this.getUsingWidgets.bind(this)}>
                    get in use widgets
                </button>
                <button onClick={this.addUsingWidget.bind(this)}>
                    add in use widgets
                </button> */}
                <WidgetGallery />
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
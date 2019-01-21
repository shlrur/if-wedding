import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    getDashboardsRequest,
    createDashboardRequest,
} from '../../../redux/actions/dashboards';
import {
    logout
} from '../../../redux/actions/authentication';

import WidgetGallery from './widgetGallery';

class Dashboards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDashboard: null
        };
    }

    render() {
        if (this.props.loading) {
            return <div>loading...</div>
        } else if (this.props.dashboards.length === 0) {
            return (
                <div>
                    showing add dashboard window
                    <button onClick={this.createDashboard.bind(this, 'bright')}>bright theme</button>
                </div>
            );
        } else {
            if (!this.state.selectedDashboard) {

            }
            return (
                <div className="dashboards">
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

    }

    componentDidMount() {
        this.props.getDashboardsRequest();
    }

    createDashboard(theme) {
        this.props.createDashboardRequest(theme);
    }
}

const mapStateToProps = state => ({
    dashboards: state.dashboard.dashboards,
    loading: state.dashboard.loading
})
const mapDispatchToProps = {
    getDashboardsRequest,
    createDashboardRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboards)
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    getDashboardsRequest,
    createDashboardRequest,
    resetDashboardStates
} from '../../../redux/actions/dashboards';
import {
    resetWidgetStates
} from '../../../redux/actions/widgets';

import WidgetTypes from './widgetTypes';
import WidgetGallery from './widgetGallery';

class Dashboards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showedDashboard: null
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
            console.log('draw dashboard')
            return (
                <div className="dashboards">
                    <div className="dashboard-container">
                        <div className="dashboard-header">
                            <button>{'<'}</button>
                            <span>asdasd</span>
                            <button>{'>'}</button>
                            <button>{'+'}</button>
                            <button>{'-'}</button>
                        </div>
                        <div className="dashboard-body">
                            <WidgetGallery dashboard={this.state.showedDashboard} />
                        </div>
                    </div>
                    <WidgetTypes theme={this.state.showedDashboard ? this.state.showedDashboard.theme : null} />
                    {/* <button onClick={this.getWidgetTypes.bind(this)}>
                        get widget types
                    </button>
                    <button onClick={this.getUsingWidgets.bind(this)}>
                        get in use widgets
                    </button>
                    <button onClick={this.addUsingWidget.bind(this)}>
                        add in use widgets
                    </button> */}
                </div>
            );
        }

    }

    componentWillUnmount() {
        this.props.resetDashboardStates();
        this.props.resetWidgetStates();
    }

    componentDidMount() {
        this.props.getDashboardsRequest();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dashboards.length > 0) {
            console.log('got dashboard');
            this.setState({
                showedDashboard: nextProps.dashboards[nextProps.selectedDashboardInd]
            });
        }
    }

    createDashboard(theme) {
        this.props.createDashboardRequest(theme);
    }
}

const mapStateToProps = state => ({
    // dashboard
    dashboards: state.dashboard.dashboards,
    selectedDashboardInd: state.dashboard.selectedDashboardInd,
    defaultDashboardId: state.dashboard.defaultDashboardId,
    loading: state.dashboard.loading
})
const mapDispatchToProps = {
    getDashboardsRequest,
    createDashboardRequest,
    resetDashboardStates,
    resetWidgetStates
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboards)
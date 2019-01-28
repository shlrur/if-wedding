import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    getDashboardsRequest,
    createDashboardRequest,
    resetDashboardStates,
    getPrevDashboard,
    getNextDashboard
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
            showedDashboard: null,
            showingCreateDashboardModal: false
        };
    }

    render() {
        if (this.props.loading) {
            return <div>loading...</div>;
        } else if (this.props.dashboards.length === 0 || this.state.showingCreateDashboardModal) {
            return (
                <div>
                    showing add dashboard window
                    <button onClick={() => { this.setState({ showingCreateDashboardModal: false }); }}>Close</button>
                    <button onClick={this.createDashboard.bind(this, 'bright')}>bright theme</button>
                </div>
            );
        } else {
            console.log('draw dashboard');
            return (
                <div className="dashboards">
                    <div className="dashboard-container">
                        <div className="dashboard-header">
                            <button onClick={this.getPrevDashboard.bind(this)} disabled={this.props.selectedDashboardInd === 0}>{'<'}</button>
                            <span>{this.state.showedDashboard.alias}</span>
                            <button onClick={this.getNextDashboard.bind(this)} disabled={this.props.dashboards.length - 1 === this.props.selectedDashboardInd}>{'>'}</button>
                            <button onClick={() => { this.setState({ showingCreateDashboardModal: true }); }}>{'+'}</button>
                            <button>{'-'}</button>
                        </div>
                        <div className="dashboard-body">
                            <WidgetGallery dashboard={this.state.showedDashboard} />
                        </div>
                    </div>
                    <WidgetTypes theme={this.state.showedDashboard ? this.state.showedDashboard.theme : null} />
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

    getPrevDashboard() {
        this.props.getPrevDashboard();
    }

    getNextDashboard() {
        this.props.getNextDashboard();
    }

    createDashboard(theme) {
        this.props.createDashboardRequest(theme);

        this.setState({ showingCreateDashboardModal: true });
    }
}

const mapStateToProps = state => ({
    // dashboard
    dashboards: state.dashboard.dashboards,
    selectedDashboardInd: state.dashboard.selectedDashboardInd,
    defaultDashboardId: state.dashboard.defaultDashboardId,
    loading: state.dashboard.loading
});
const mapDispatchToProps = {
    getDashboardsRequest,
    createDashboardRequest,
    resetDashboardStates,
    resetWidgetStates,
    getPrevDashboard,
    getNextDashboard
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboards);
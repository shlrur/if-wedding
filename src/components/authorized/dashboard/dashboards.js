import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    getDashboardsRequest,
    createDashboardRequest,
} from '../../../redux/actions/dashboards';
import {
    getWidgetTypesRequest
} from '../../../redux/actions/widgets';

import WidgetGallery from './widgetGallery';

class Dashboards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showedDashboard: null,
            showedDashboardTheme: null
        };
    }

    render() {
        if (this.props.dashboardLoading) {
            return <div>loading...</div>
        } else if (this.props.dashboards.length === 0) {
            return (
                <div>
                    showing add dashboard window
                    <button onClick={this.createDashboard.bind(this, 'bright')}>bright theme</button>
                </div>
            );
        } else {
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

    componentDidMount() {
        this.props.getDashboardsRequest();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showedDashboard: nextProps.dashboards[nextProps.selectedDashboardInd]
        });

        if(!this.state.showedDashboardTheme || this.state.showedDashboardTheme !== this.showedDashboard.theme) {
            this.setState({
                showedDashboardTheme: this.showedDashboard.theme
            });

            this.props.getWidgetTypesRequest(this.state.showedDashboardTheme);
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
    dashboardLoading: state.dashboard.loading,
    // widget
    widgetTypesLoading: state.widget.widgetTypesLoading
})
const mapDispatchToProps = {
    getWidgetTypesRequest,
    getDashboardsRequest,
    createDashboardRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboards)
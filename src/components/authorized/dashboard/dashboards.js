import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import i18n from '../../../i18n/i18n';

import {
    getDashboardsRequest,
    createDashboardRequest,
    deleteDashboardRequest,
    resetDashboardStates,
    getPrevDashboard,
    getNextDashboard
} from '../../../redux/actions/dashboards';
import {
    resetWidgetStates
} from '../../../redux/actions/widgets';

import WidgetTypes from './widgetTypes';
import WidgetGallery from './widgetGallery';
import DashboardPreview from './dashboardPreview';

Modal.setAppElement('#app');

class Dashboards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showedDashboard: null,
            showingCreateDashboardModal: false,
            showingDeleteDashboardModal: false
        };

        this.dashboardPreviewRef = React.createRef();
    }

    render() {
        if (this.props.loading) {
            return <div>loading...</div>;
        } else if (this.props.dashboards.length === 0 || this.state.showingCreateDashboardModal) {
            return (
                <div>
                    <p>showing add dashboard modal</p>
                    <button onClick={() => { this.setState({ showingCreateDashboardModal: false }); }}>Close</button>
                    <button onClick={this.createDashboard.bind(this, 'bright')}>bright theme</button>
                </div>
            );
        } else if (this.state.showingDeleteDashboardModal) {
            return (
                <div>
                    <p>showing delete dashboard modal</p>
                    <button onClick={() => { this.setState({ showingDeleteDashboardModal: false }); }}>Close</button>
                    <button onClick={this.deleteDashboard.bind(this, this.state.showedDashboard)}>Delete!!!!</button>
                </div>
            );
        } else {
            return (
                <div className="dashboards">
                    <WidgetTypes theme={this.state.showedDashboard ? this.state.showedDashboard.theme : null} />
                    <div className="dashboard-container">
                        <div className="dashboard-header">
                            <h5>{this.state.showedDashboard.alias}</h5>
                            <div className="btn-wrapper">
                                <button onClick={this.showPreviewModal.bind(this)}>{i18n.t('auth.preview')}</button>
                                <button onClick={this.getPrevDashboard.bind(this)} disabled={this.props.selectedDashboardInd === 0}>{'<'}</button>
                                <button onClick={this.getNextDashboard.bind(this)} disabled={this.props.dashboards.length - 1 === this.props.selectedDashboardInd}>{'>'}</button>
                                <button onClick={() => { this.setState({ showingCreateDashboardModal: true }); }}>{'+'}</button>
                                <button onClick={() => { this.setState({ showingDeleteDashboardModal: true }); }}>{'-'}</button>
                            </div>
                        </div>
                        <div className="dashboard-body">
                            <WidgetGallery dashboard={this.state.showedDashboard} />
                        </div>
                    </div>

                    <DashboardPreview ref={instance => { this.dashboardPreviewRef = instance; }} dashboard={this.state.showedDashboard} />
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

        this.setState({ showingCreateDashboardModal: false });
    }

    deleteDashboard(dashboard) {
        this.props.deleteDashboardRequest(dashboard);

        this.setState({ showingDeleteDashboardModal: false });
    }

    showPreviewModal() {
        this.dashboardPreviewRef.getWrappedInstance().showModal();
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
    deleteDashboardRequest,
    resetDashboardStates,
    resetWidgetStates,
    getPrevDashboard,
    getNextDashboard
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboards);
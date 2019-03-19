import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

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

Modal.setAppElement('#app');

class DashboardPreview extends Component {
    constructor(props) {
        super(props);

        
    }

    render() {
        return (
            <Modal>
                asd
            </Modal>
        );
    }

    showModal() {
        console.log(this.props.dashboard);
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
    mapDispatchToProps,
    null, { withRef: true }
)(DashboardPreview);
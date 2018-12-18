import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createDashboard } from '../redux/actions/dashboard';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Authentication />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    widgets: state.dashboard.widgets
})
const mapDispatchToProps = {
    createDashboard
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
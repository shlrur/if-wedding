import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createDashboard } from '../redux/actions/dashboard';
import { getWidgetTypes } from '../redux/actions/widgets';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Authentication />
                <button onClick={this.getWidgetTypes.bind(this)}>
                    getWidgetTypes
                </button>
            </div>
        );
    }

    getWidgetTypes() {
        this.props.getWidgetTypes();
    }
}

const mapStateToProps = state => ({
    widgetTypes: state.widget.widgetTypes
})
const mapDispatchToProps = {
    getWidgetTypes
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
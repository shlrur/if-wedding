import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    getWidgetTypesRequest,
    getUseWidgetsRequest
} from '../redux/actions/widgets';

import Authentication from './authentication';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Authentication />
                <button onClick={this.getWidgetTypes.bind(this)}>
                    get widget types
                </button>
                <button onClick={this.getUsingWidgets.bind(this)}>
                    get in use widgets
                </button>
            </div>
        );
    }

    getWidgetTypes() {
        this.props.getWidgetTypesRequest();
    }

    getUsingWidgets() {
        this.props.getUseWidgetsRequest();
    }
}

const mapStateToProps = state => ({
    widgetTypes: state.widget.widgetTypes,
    usingWidgets: state.widget.usingWidgets
})
const mapDispatchToProps = {
    getWidgetTypesRequest,
    getUseWidgetsRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
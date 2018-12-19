import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getWidgetTypesRequest } from '../redux/actions/widgets';

import Authentication from './authentication';

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
        this.props.getWidgetTypesRequest();
    }
}

const mapStateToProps = state => ({
    widgetTypes: state.widget.widgetTypes
})
const mapDispatchToProps = {
    getWidgetTypesRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
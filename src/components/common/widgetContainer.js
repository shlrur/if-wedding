import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    getWidgetTypesRequest,
    getUseWidgetsRequest,
    addUseWidgetRequest
} from '../../redux/actions/widgets';

class WidgetContainer extends Component {
    render() {
        return (
            <div>
                <button onClick={this.getWidgetTypes.bind(this)}>
                    get widget types
                </button>
                <button onClick={this.getUsingWidgets.bind(this)}>
                    get in use widgets
                </button>
                <button onClick={this.addUsingWidget.bind(this)}>
                    add in use widgets
                </button>
                {this.generateWidgetWrapper()}
            </div>
        );
    }

    generateWidgetWrapper() {
        let tempWidgets = [
            {name: 'greeting', des: 'first'},
            {name: 'guestBook', des: 'second'},
            {name: 'map', des: 'third'}
        ];

        

        return (
            <div>
                asdasd
            </div>
        );
    }

    getWidgetTypes() {
        this.props.getWidgetTypesRequest();
    }

    getUsingWidgets() {
        this.props.getUseWidgetsRequest();
    }

    addUsingWidget() {
        this.props.addUseWidgetRequest({
            name: 'greeting',
            position: {
                x: 0,
                y: 0,
                w: 1,
                h: 1
            },
            property: {
                text1: 'hello',
                text2: 'world'
            }
        });
    }
}

const mapStateToProps = state => ({
    widgetTypes: state.widget.widgetTypes,
    usingWidgets: state.widget.usingWidgets
})
const mapDispatchToProps = {
    getWidgetTypesRequest,
    getUseWidgetsRequest,
    addUseWidgetRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WidgetContainer)
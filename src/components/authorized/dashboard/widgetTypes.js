import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    getWidgetTypesRequest,
    addUseWidgetRequest
} from '../../../redux/actions/widgets';

class WidgetTypes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showedDashboardTheme: props.theme
        };

        if (this.state.showedDashboardTheme) {
            this.props.getWidgetTypesRequest(this.state.showedDashboardTheme);
        }
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="widget-types">loading...</div>
            );
        } else if (!this.props.widgetTypes) {
            return (
                <div>
                    No Widget Types
                </div>
            );
        }
        return (
            <div className="widget-types">
                {this.props.widgetTypes.map((widgetType) => {
                    return (
                        <div className="widget-type" key={widgetType.id}>
                            {widgetType.alias}
                            <button onClick={this.addWidget.bind(this, widgetType)}>add</button>
                        </div>
                    );
                })}
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.showedDashboardTheme || this.state.showedDashboardTheme !== nextProps.theme) {
            this.setState({
                showedDashboardTheme: nextProps.theme
            });

            this.props.getWidgetTypesRequest(nextProps.theme);
        }
    }

    addWidget(widgetType) {
        this.props.addUseWidgetRequest(widgetType);
    }
}

const mapStateToProps = state => ({
    loading: state.widget.widgetTypesLoading,
    widgetTypes: state.widget.widgetTypes
});
const mapDispatchToProps = {
    getWidgetTypesRequest,
    addUseWidgetRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WidgetTypes);
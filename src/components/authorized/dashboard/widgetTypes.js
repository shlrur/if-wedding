import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    getWidgetTypesRequest
} from '../../../redux/actions/widgets';

class WidgetTypes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showedDashboardTheme: props.theme
        };

        if(this.state.showedDashboardTheme) {
            this.props.getWidgetTypesRequest(this.state.showedDashboardTheme);
        }
    }

    render() {
        if (this.props.loading) {
            return (
                <div>loading...</div>
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
                {this.props.widgetTypes.length}
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        console.log('got theme');

        if (!this.state.showedDashboardTheme || this.state.showedDashboardTheme !== nextProps.theme) {
            this.setState({
                showedDashboardTheme: nextProps.theme
            });

            this.props.getWidgetTypesRequest(this.state.showedDashboardTheme);
        }
    }
}

const mapStateToProps = state => ({
    loading: state.widget.widgetTypesLoading,
    widgetTypes: state.widget.widgetTypes
})
const mapDispatchToProps = {
    getWidgetTypesRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WidgetTypes)
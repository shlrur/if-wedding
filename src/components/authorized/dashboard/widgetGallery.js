import React, { Component } from 'react';
import { connect } from 'react-redux';

import GridLayout from 'react-grid-layout';

import { getWidgetComponent } from '../../widgets/widgets';
import WidgetEditWrapper from './widgetEditWrapper';

import {
    getUseWidgetsRequest
} from '../../../redux/actions/widgets';

class WidgetGallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dashboard: props.dashboard
        }

        this.props.getUseWidgetsRequest(this.state.dashboard.id);
    }

    render() {
        if (this.props.useWidgetsLoading) {
            return (
                <div className="widget-gallery">
                    Loading...
                </div>
            );
        } else if (!this.props.useWidgets || this.props.useWidgets.length === 0) {
            return (
                <div className="widget-gallery">
                    No Widgets
                </div>
            );
        }

        return (
            <div className="widget-gallery">
                <GridLayout className="widget-grids" draggableHandle=".widget-wrapper-header"
                    cols={12} rowHeight={30} width={1200}
                    onLayoutChange={this.onLayoutChange.bind(this)}
                >
                    {this.props.useWidgets.map((widgetInform) => {
                        return (
                            <div className="widget-grid" key={widgetInform.id} data-grid={widgetInform.layout}>
                                <WidgetEditWrapper widgetComponent={getWidgetComponent(`${widgetInform.theme}_${widgetInform.name}`)} inform={widgetInform} />
                            </div>
                        );
                    })}
                </GridLayout>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        // get use widgets when dashboard "changed"
        if (!this.state.dashboard || this.state.dashboard.id !== nextProps.dashboard.id) {
            this.setState({
                dashboard: nextProps.dashboard
            });

            this.props.getUseWidgetsRequest(this.state.dashboard.id);
        }
    }

    onLayoutChange(layout) {
        // this.props.modifyDashboardLayoutRequest(layout);
    }
}

const mapStateToProps = state => ({
    useWidgets: state.widget.useWidgets,
    useWidgetsLoading: state.widget.useWidgetsLoading
})
const mapDispatchToProps = {
    getUseWidgetsRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WidgetGallery)
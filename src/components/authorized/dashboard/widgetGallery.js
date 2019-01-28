import React, { Component } from 'react';
import { connect } from 'react-redux';

import GridLayout from 'react-grid-layout';

import { getWidgetComponent } from '../../widgets/widgets';
import WidgetEditWrapper from './widgetEditWrapper';

import {
    getUseWidgetsRequest
} from '../../../redux/actions/widgets';
import {
    modifyDashboardLayoutRequest
} from '../../../redux/actions/dashboards';

class WidgetGallery extends Component {
    constructor(props) {
        super(props);

        this.props.getUseWidgetsRequest(props.dashboard.id);
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

        console.log('set widgets');
        console.log(this.props.useWidgets);
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
        if (!this.props.dashboard || this.props.dashboard.id !== nextProps.dashboard.id) {

            this.props.getUseWidgetsRequest(nextProps.dashboard.id);
        }
    }

    onLayoutChange(layout) {
        let dashboardLayout = [...this.props.dashboard.layout];

        // if each other dashboard layout, just return.
        if (layout.length !== dashboardLayout.length) {
            return;
        }

        dashboardLayout.sort((a, b) => { return a.y - b.y; });
        layout.sort((a, b) => { return a.y - b.y; });

        if(dashboardLayout[0].i !== layout[0].i) {
            return ;
        }

        // if perfectely same layout, just return.
        let isSame = true,
            ind;

        for(ind=0 ; ind<layout.length ; ind++) {
            isSame = (
                layout[ind].i === dashboardLayout[ind].i &&
                layout[ind].x === dashboardLayout[ind].x &&
                layout[ind].y === dashboardLayout[ind].y &&
                layout[ind].h === dashboardLayout[ind].h &&
                layout[ind].w === dashboardLayout[ind].w
            ) && isSame;

            if(!isSame) {
                break;
            }
        }

        if(!isSame) {
            this.props.modifyDashboardLayoutRequest(layout);
        }
    }
}

const mapStateToProps = state => ({
    useWidgets: state.widget.useWidgets,
    useWidgetsLoading: state.widget.useWidgetsLoading
});
const mapDispatchToProps = {
    getUseWidgetsRequest,
    modifyDashboardLayoutRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WidgetGallery);
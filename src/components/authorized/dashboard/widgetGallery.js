import React, { Component } from 'react';
import { connect } from 'react-redux';

import GridLayout from 'react-grid-layout';

import { getWidgetComponent } from '../../widgets/widgets';
import WidgetEditWrapper from './widgetEditWrapper';

import {
    getWidgetTypesRequest,
    getUseWidgetsRequest,
    addUseWidgetRequest
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
                    layout={this.state.dashboard.layout} cols={12} rowHeight={30} width={1200}
                // verticalCompact={true}
                >
                    {this.props.useWidgets.map((widgetInform) => {
                        return (
                            <div className="widget-grid" key={widgetInform.id}>
                                <WidgetEditWrapper widgetComponent={getWidgetComponent(`${widgetInform.theme}_${widgetInform.name}`)} inform={widgetInform} />
                            </div>
                        );
                    })}
                </GridLayout>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        // get use widgets when dashboard changed
        if (!this.state.dashboard || this.state.dashboard.id !== nextProps.dashboard.id) {
            this.setState({
                dashboard: nextProps.dashboard
            });

            this.props.getUseWidgetsRequest(this.state.dashboard.id);
        }
    }

    generateWidgetWrapper() {
        // let tempWidgets = [
        //     {
        //         id: 'asdhkjhqwkdj', // psuedo code
        //         themeName: 'bright',
        //         widgetName: 'BrightGreeting1'
        //     },
        //     {
        //         id: 'sdfsdfsdf', // psuedo code
        //         themeName: 'bright',
        //         widgetName: 'BrightGuestbook1'
        //     },
        //     {
        //         id: 'asdhkjhasdfqwkdj', // psuedo code
        //         themeName: 'bright',
        //         widgetName: 'BrightMap1'
        //     },
        //     {
        //         id: 'qersdfsdf', // psuedo code
        //         themeName: 'bright',
        //         widgetName: 'BrightPhotoalbum1'
        //     }
        // ];
        // var layout = [
        //     { i: 'asdhkjhqwkdj', x: 0, y: 0, w: 1, h: 2 },
        //     { i: 'sdfsdfsdf', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        //     { i: 'asdhkjhasdfqwkdj', x: 4, y: 0, w: 1, h: 2 },
        //     { i: 'qersdfsdf', x: 6, y: 0, w: 1, h: 2 }
        // ];

        return (
            <GridLayout className="widget-grids" draggableHandle=".widget-wrapper-header" layout={this.state.dashboard.layout} cols={12} rowHeight={30} width={1200}>
                {this.props.useWidgets.map((widgetInform) => {
                    return (
                        <div className="widget-grid" key={widgetInform.id}>
                            <WidgetEditWrapper widgetComponent={getWidgetComponent(widgetInform.widgetName)} inform={widgetInform} />
                        </div>
                    );
                })}
            </GridLayout>
        );
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
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
    render() {
        return (
            <div className="widget-gallery">

                {this.generateWidgetWrapper()}
            </div>
        );
    }

    componentDidMount() {
        // getting in use widget list
        this.props.getUseWidgetsRequest();
    }

    generateWidgetWrapper() {
        let tempWidgets = [
            {
                id: 'asdhkjhqwkdj', // psuedo code
                themeName: 'bright',
                widgetName: 'BrightGreeting1'
            },
            {
                id: 'sdfsdfsdf', // psuedo code
                themeName: 'bright',
                widgetName: 'BrightGuestbook1'
            },
            {
                id: 'asdhkjhasdfqwkdj', // psuedo code
                themeName: 'bright',
                widgetName: 'BrightMap1'
            },
            {
                id: 'qersdfsdf', // psuedo code
                themeName: 'bright',
                widgetName: 'BrightPhotoalbum1'
            }
        ];
        var layout = [
            { i: 'asdhkjhqwkdj', x: 0, y: 0, w: 1, h: 2 },
            { i: 'sdfsdfsdf', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
            { i: 'asdhkjhasdfqwkdj', x: 4, y: 0, w: 1, h: 2 },
            { i: 'qersdfsdf', x: 6, y: 0, w: 1, h: 2 }
        ];

        return (
            <GridLayout className="widget-grids" draggableHandle=".widget-wrapper-header" layout={layout} cols={12} rowHeight={30} width={1200}>
                {tempWidgets.map((widgetInform) => {
                    return (
                        <div className="widget-grid" key={widgetInform.id}>
                            <WidgetEditWrapper widgetComponent={getWidgetComponent(widgetInform.widgetName)} inform={tempWidgets[0]}/>
                        </div>
                    );
                })}
            </GridLayout>
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
)(WidgetGallery)
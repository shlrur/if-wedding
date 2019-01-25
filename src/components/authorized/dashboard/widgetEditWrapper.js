import React, { Component } from 'react';

export default class WidgetEditWrapper extends Component {
    render() {
        // console.log(this.props);
        const WidgetComponent = this.props.widgetComponent;
        return (
            <div>
                <div className="widget-wrapper-header" ></div>
                <WidgetComponent></WidgetComponent>
            </div>
        );
    }
}
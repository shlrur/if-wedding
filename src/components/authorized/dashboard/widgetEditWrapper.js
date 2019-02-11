import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteUseWidgetRequest } from '../../../redux/actions/widgets';

class WidgetEditWrapper extends Component {
    render() {
        const WidgetComponent = this.props.widgetComponent;
        return (
            <div style={{height:'100%'}}>
                <div className="widget-wrapper-header" >
                    {this.props.inform.alias}
                    <button className="delete_widget_btn" onClick={this.deleteWidget.bind(this)}>X</button>
                </div>
                <WidgetComponent inform={this.props.inform}></WidgetComponent>
            </div>
        );
    }

    deleteWidget() {
        this.props.deleteUseWidgetRequest(this.props.inform);
    }
}

// const mapStateToProps = state => ({

// });
const mapDispatchToProps = {
    deleteUseWidgetRequest
};

export default connect(
    null,
    mapDispatchToProps
)(WidgetEditWrapper);
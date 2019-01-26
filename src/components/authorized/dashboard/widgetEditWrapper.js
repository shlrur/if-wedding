import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteUseWidgetRequest } from '../../../redux/actions/widgets';

class WidgetEditWrapper extends Component {
    render() {
        // console.log(this.props);
        const WidgetComponent = this.props.widgetComponent;
        return (
            <div>
                <div className="widget-wrapper-header" >
                    <button className="delete_widget_btn" onClick={this.deleteWidget.bind(this)}>X</button>
                </div>
                <WidgetComponent></WidgetComponent>
            </div>
        );
    }

    deleteWidget() {
        console.log(this.props.inform);
        this.props.deleteUseWidgetRequest(this.props.inform);
    }
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = {
    deleteUseWidgetRequest
}

export default connect(
    null,
    mapDispatchToProps
)(WidgetEditWrapper)
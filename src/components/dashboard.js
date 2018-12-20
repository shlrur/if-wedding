import React, { Component } from 'react';
// import { connect } from 'react-redux';

import Authentication from './authentication';
import WidgetContainer from './widgetContainer';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Authentication />
                <WidgetContainer />
                
            </div>
        );
    }
}

// const mapStateToProps = state => ({
//     widgetTypes: state.widget.widgetTypes,
//     usingWidgets: state.widget.usingWidgets
// })
// const mapDispatchToProps = {
//     getWidgetTypesRequest,
//     getUseWidgetsRequest
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Dashboard)
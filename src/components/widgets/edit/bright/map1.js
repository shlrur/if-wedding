import React, { Component } from 'react';
import { connect } from 'react-redux';

// import i18n from '../../../../i18n/i18n';

import { setGeneralWidgetConfigsRequest } from '../../../../redux/actions/widgetConfig';
import WeddingHallSearchMap from '../../../common/weddingHallSearchMap';

class BrightMap1Edit extends Component {
    render() {
        const userWeddingPlace = this.props.user.weddingInformation.weddingPlace;
        const widgetWeddingPlace = this.props.inform.configs.weddingPlace;

        return (
            <div className="widget-map-bright-1-edit">
                <WeddingHallSearchMap weddingPlace={widgetWeddingPlace ? widgetWeddingPlace : userWeddingPlace} onSelectWeddingPlace={this.selectWeddingPlace.bind(this)} />
            </div>
        );
    }

    selectWeddingPlace(place) {
        this.props.setGeneralWidgetConfigsRequest({ weddingPlace: place }, this.props.inform.id);
    }
}

const mapStateToProps = state => ({
    user: state.authentication.user
});
const mapDispatchToProps = {
    setGeneralWidgetConfigsRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrightMap1Edit);
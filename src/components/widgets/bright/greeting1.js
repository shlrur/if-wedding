import React, { Component } from 'react';
import { connect } from 'react-redux';

import i18n from '../../../i18n/i18n';

class BrightGreeting1 extends Component {
    constructor(props) {
        super(props);

        const defaultWeddingInform = this.props.user.weddingInformation;
        const widgetConfig = this.props.inform.configs;

        const brideName = ;
        const brideParents = widgetConfig.bride || i18n.t('widgets.greeting_1.bride', {
            name: defaultWeddingInform.bride.firstName,
            fatherName: defaultWeddingInform.bride.fatherName,
            motherName: defaultWeddingInform.bride.motherName,
        });
        const groomName = 
        const groomParents = widgetConfig.groom || i18n.t('widgets.greeting_1.groom', {
            name: defaultWeddingInform.groom.firstName,
            fatherName: defaultWeddingInform.groom.fatherName,
            motherName: defaultWeddingInform.groom.motherName,
        });

        this.state = {
            bride: bride,
            groom: groom,
            greetingText: ''
        };
    }

    render() {
        return (
            <div className="widget-greeting-bright-1">
                <div className="bride">
                    <input type="text" value="" placeholder=""></input>
                </div>
                <div className="groom"></div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.authentication.user
});
const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrightGreeting1);
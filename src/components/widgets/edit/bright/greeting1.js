import React, { Component } from 'react';
import { connect } from 'react-redux';

import i18n from '../../../../i18n/i18n';

class BrightGreeting1Edit extends Component {
    constructor(props) {
        super(props);

        const defaultWeddingInform = this.props.user.weddingInformation;
        const widgetConfig = this.props.inform.configs;

        const brideName = widgetConfig.brideName || defaultWeddingInform.bride.firstName;
        const brideParents = widgetConfig.brideParents || i18n.t('widgets.greeting_1.parents', {
            kinshipTerms: defaultWeddingInform.bride.kinshipTerms,
            fatherName: defaultWeddingInform.bride.fatherName,
            motherName: defaultWeddingInform.bride.motherName,
        });
        const groomName = widgetConfig.groomName || defaultWeddingInform.groom.firstName;
        const groomParents = widgetConfig.groomParents || i18n.t('widgets.greeting_1.parents', {
            kinshipTerms: defaultWeddingInform.groom.kinshipTerms,
            fatherName: defaultWeddingInform.groom.fatherName,
            motherName: defaultWeddingInform.groom.motherName,
        });

        this.state = {
            brideName,
            brideParents,
            groomName,
            groomParents,
            greetingText: widgetConfig.greetingText || defaultWeddingInform.greetingText
        };
    }

    render() {
        return (
            <div className="widget-greeting-bright-1">
                <div id="groom">
                    <p id="groom-name">
                        {this.state.groomName}
                    </p>
                    <p id="groom-parents">
                        {this.state.groomParents}
                    </p>
                </div>
                <div id="bride">
                    <p id="bride-name">
                        {this.state.brideName}
                    </p>
                    <p id="bride-parents">
                        {this.state.brideParents}
                    </p>
                </div>
                <p id="greeting-text">
                    {this.state.greetingText}
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.authentication.user
});
const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrightGreeting1Edit);
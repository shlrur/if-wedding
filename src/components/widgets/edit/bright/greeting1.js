import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import i18n from '../../../../i18n/i18n';

import { setGeneralWidgetConfigsRequest } from '../../../../redux/actions/widgetConfig';

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

        this.debounced = _.debounce(this.setConfigHandler.bind(this), 1000);
        this.objectForPreventDuplicated = {
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
                    <input type="text" className="form-control" id="groom-name" placeholder={i18n.t('widgets.greeting_1.placeholder.groomName')}
                        value={this.state.groomName}
                        onChange={this.onChangeHandler.bind(this, 'groomName')} />
                    <input type="text" className="form-control" id="groom-parents" placeholder={i18n.t('widgets.greeting_1.placeholder.groomParents')}
                        value={this.state.groomParents}
                        onChange={this.onChangeHandler.bind(this, 'groomParents')} />
                </div>
                <div id="bride">
                    <input type="text" className="form-control" id="bride-name" placeholder={i18n.t('widgets.greeting_1.placeholder.brideName')}
                        value={this.state.brideName}
                        onChange={this.onChangeHandler.bind(this, 'brideName')} />
                    <input type="text" className="form-control" id="bride-parents" placeholder={i18n.t('widgets.greeting_1.placeholder.brideParents')}
                        value={this.state.brideParents}
                        onChange={this.onChangeHandler.bind(this, 'brideParents')} />
                </div>
                <input type="text" className="form-control" id="greeting-text" placeholder={i18n.t('widgets.greeting_1.placeholder.greetingText')}
                    value={this.state.greetingText}
                    onChange={this.onChangeHandler.bind(this, 'greetingText')} />
            </div>
        );
    }

    onChangeHandler(targetKey, e) {
        this.setState({ [targetKey]: e.target.value });

        this.debounced(targetKey);
    }

    setConfigHandler(targetKey) {
        if (this.objectForPreventDuplicated[targetKey] === this.state[targetKey]) {
            return;
        }

        // if (!this.state[targetKey].replace(/^\s+|\s+$/g, '')) {
        //     console.log('no keyword');

        //     return;
        // }
        
        console.log(targetKey, this.state[targetKey]);
        this.objectForPreventDuplicated[targetKey] = this.state[targetKey];

        this.props.setGeneralWidgetConfigsRequest({ [targetKey]: this.state[targetKey] }, this.props.inform.id);
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
)(BrightGreeting1Edit);
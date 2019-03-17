import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import i18n from '../../../i18n/i18n';

import { setWeddingInformation } from '../../../redux/actions/authentication';
import WeddingHallSearchMap from '../../common/weddingHallSearchMap';

class WeddingInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: fromJS(this.props.user.weddingInformation)
        };
    }
    render() {
        const { data } = this.state;

        return (
            <div className="wedding-information container">
                <button onClick={this.saveWeddingInformation.bind(this)}>{i18n.t('weddingInform.save')}</button>
                <div className="row couple-information">
                    <div className="col">
                        <h2 className="text-center">{i18n.t('weddingInform.bride')}</h2>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label htmlFor="bride-family-name">{i18n.t('weddingInform.familyName')}</label>
                                <input type="text" className="form-control" id="bride-family-name" placeholder={i18n.t('weddingInform.bridePlaceholder.familyName')}
                                    value={data.getIn(['bride', 'familyName'])}
                                    onChange={(e) => { this.setState({ data: data.setIn(['bride', 'familyName'], e.target.value) }); }} />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="bride-first-name">{i18n.t('weddingInform.firstName')}</label>
                                <input type="text" className="form-control" id="bride-first-name" placeholder={i18n.t('weddingInform.bridePlaceholder.firstName')}
                                    value={data.getIn(['bride', 'firstName'])}
                                    onChange={(e) => { this.setState({ data: data.setIn(['bride', 'firstName'], e.target.value) }); }} />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="bride-kinshipTerms">{i18n.t('weddingInform.kinshipTerms')}</label>
                                <input type="text" className="form-control" id="bride-kinshipTerms" placeholder={i18n.t('weddingInform.bridePlaceholder.kinshipTerms')}
                                    value={data.getIn(['bride', 'kinshipTerms'])}
                                    onChange={(e) => { this.setState({ data: data.setIn(['bride', 'kinshipTerms'], e.target.value) }); }} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bride-father-name">{i18n.t('weddingInform.fatherName')}</label>
                            <input type="text" className="form-control" id="bride-father-name" placeholder={i18n.t('weddingInform.bridePlaceholder.fatherName')}
                                value={data.getIn(['bride', 'fatherName'])}
                                onChange={(e) => { this.setState({ data: data.setIn(['bride', 'fatherName'], e.target.value) }); }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bride-mother-name">{i18n.t('weddingInform.motherName')}</label>
                            <input type="text" className="form-control" id="bride-mother-name" placeholder={i18n.t('weddingInform.bridePlaceholder.motherName')}
                                value={data.getIn(['bride', 'motherName'])}
                                onChange={(e) => { this.setState({ data: data.setIn(['bride', 'motherName'], e.target.value) }); }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bride-phone-number">{i18n.t('weddingInform.phone')}</label>
                            <input type="tel" className="form-control" id="bride-phone-number" placeholder={i18n.t('weddingInform.bridePlaceholder.phone')}
                                value={data.getIn(['bride', 'phoneNumber'])}
                                onChange={(e) => { this.setState({ data: data.setIn(['bride', 'phoneNumber'], e.target.value) }); }} />
                        </div>
                    </div>
                    <div className="col">
                        <h2 className="text-center">{i18n.t('weddingInform.groom')}</h2>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label htmlFor="groom-family-name">{i18n.t('weddingInform.familyName')}</label>
                                <input type="text" className="form-control" id="groom-family-name" placeholder={i18n.t('weddingInform.groomPlaceholder.familyName')}
                                    value={data.getIn(['groom', 'familyName'])}
                                    onChange={(e) => { this.setState({ data: data.setIn(['groom', 'familyName'], e.target.value) }); }} />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="groom-first-name">{i18n.t('weddingInform.firstName')}</label>
                                <input type="text" className="form-control" id="groom-first-name" placeholder={i18n.t('weddingInform.groomPlaceholder.firstName')}
                                    value={data.getIn(['groom', 'firstName'])}
                                    onChange={(e) => { this.setState({ data: data.setIn(['groom', 'firstName'], e.target.value) }); }} />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="groom-kinshipTerms">{i18n.t('weddingInform.kinshipTerms')}</label>
                                <input type="text" className="form-control" id="groom-kinshipTerms" placeholder={i18n.t('weddingInform.groomPlaceholder.kinshipTerms')}
                                    value={data.getIn(['groom', 'kinshipTerms'])}
                                    onChange={(e) => { this.setState({ data: data.setIn(['groom', 'kinshipTerms'], e.target.value) }); }} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="groom-father-name">{i18n.t('weddingInform.fatherName')}</label>
                            <input type="text" className="form-control" id="groom-father-name" placeholder={i18n.t('weddingInform.groomPlaceholder.fatherName')}
                                value={data.getIn(['groom', 'fatherName'])}
                                onChange={(e) => { this.setState({ data: data.setIn(['groom', 'fatherName'], e.target.value) }); }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="groom-mother-name">{i18n.t('weddingInform.motherName')}</label>
                            <input type="text" className="form-control" id="groom-mother-name" placeholder={i18n.t('weddingInform.groomPlaceholder.motherName')}
                                value={data.getIn(['groom', 'motherName'])}
                                onChange={(e) => { this.setState({ data: data.setIn(['groom', 'motherName'], e.target.value) }); }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="groom-phone-number">{i18n.t('weddingInform.phone')}</label>
                            <input type="tel" className="form-control" id="groom-phone-number" placeholder={i18n.t('weddingInform.groomPlaceholder.phone')}
                                value={data.getIn(['groom', 'phoneNumber'])}
                                onChange={(e) => { this.setState({ data: data.setIn(['groom', 'phoneNumber'], e.target.value) }); }} />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="text-center">
                    <h2>{i18n.t('weddingInform.greeting')}</h2>
                    <textarea className="form-control" rows="3" placeholder={i18n.t('weddingInform.greetingPlaceholder')}
                        value={data.get('greetingText')}
                        onChange={(e) => { this.setState({ data: data.set('greetingText', e.target.value) }); }} />
                </div>
                <hr />
                <div className="text-center">
                    <h2>{i18n.t('weddingInform.weddingPlace')}</h2>
                    <WeddingHallSearchMap weddingPlace={data.get('weddingPlace') ? data.get('weddingPlace').toJS() : null} onSelectWeddingPlace={this.selectWeddingPlace.bind(this)} />
                </div>
            </div>
        );
    }

    selectWeddingPlace(place) {
        const { data } = this.state;

        this.setState({ data: data.set('weddingPlace', fromJS(place)) });
    }

    saveWeddingInformation() {
        const savingWeddingInformation = this.state.data.toJS();

        console.log(savingWeddingInformation);
        this.props.setWeddingInformation(savingWeddingInformation);
    }
}

const mapStateToProps = state => ({
    user: state.authentication.user,
    loading: state.authentication.loading
});
const mapDispatchToProps = {
    setWeddingInformation
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeddingInformation);
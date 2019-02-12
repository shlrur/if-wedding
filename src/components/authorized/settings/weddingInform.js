import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import { setWeddingInformation } from '../../../redux/actions/authentication';
import WeddingHallSearchMap from './weddingHallSearchMap';

class WeddingInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: fromJS(this.props.user.weddingInformation)
            // data: Map({
            //     bride: Map({
            //         firstName: this.props.user.weddingInformation.bride.firstName,
            //         familyName: this.props.user.weddingInformation.bride.familyName,
            //         appellation: this.props.user.weddingInformation.bride.appellation,
            //         fatherName: this.props.user.weddingInformation.bride.fatherName,
            //         motherName: this.props.user.weddingInformation.bride.motherName,
            //         phoneNumber: this.props.user.weddingInformation.bride.phoneNumber
            //     }),
            //     groom: Map({
            //         firstName: this.props.user.weddingInformation.groom.firstName,
            //         familyName: this.props.user.weddingInformation.groom.familyName,
            //         appellation: this.props.user.weddingInformation.groom.appellation,
            //         fatherName: this.props.user.weddingInformation.groom.fatherName,
            //         motherName: this.props.user.weddingInformation.groom.motherName,
            //         phoneNumber: this.props.user.weddingInformation.groom.phoneNumber
            //     }),
            //     greetingText: this.props.user.weddingInformation.greetingText,
            //     weddingPlace: this.props.user.weddingInformation.weddingPlace
            // })
        };
    }
    render() {
        const { data } = this.state;

        return (
            <div className="wedding-information container">
                <button onClick={this.saveWeddingInformation.bind(this)}>저장</button>
                <div className="row couple-information">
                    <div className="col">
                        <h2 className="text-center">신부</h2>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label htmlFor="bride-family-name">성</label>
                                <input type="text" className="form-control" id="bride-family-name" placeholder="성"
                                    value={data.getIn(['bride', 'familyName'])}
                                    onChange={(e) => { this.setState({ data: data.setIn(['bride', 'familyName'], e.target.value) }); }} />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="bride-first-name">이름</label>
                                <input type="text" className="form-control" id="bride-first-name" placeholder="춘향"
                                    value={data.getIn(['bride', 'firstName'])}
                                    onChange={(e) => { this.setState({ data: data.setIn(['bride', 'firstName'], e.target.value) }); }} />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="bride-appellation">호칭</label>
                                <input type="text" className="form-control" id="bride-appellation" placeholder="장녀/차녀/..."
                                    value={data.getIn(['bride', 'appellation'])}
                                    onChange={(e) => { this.setState({ data: data.setIn(['bride', 'appellation'], e.target.value) }); }} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bride-father-name">아버님 성함</label>
                            <input type="text" className="form-control" id="bride-father-name" placeholder="아버님"
                                value={data.getIn(['bride', 'fatherName'])}
                                onChange={(e) => { this.setState({ data: data.setIn(['bride', 'fatherName'], e.target.value) }); }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bride-mother-name">어머님 성함</label>
                            <input type="text" className="form-control" id="bride-mother-name" placeholder="어머님"
                                value={data.getIn(['bride', 'motherName'])}
                                onChange={(e) => { this.setState({ data: data.setIn(['bride', 'motherName'], e.target.value) }); }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bride-phone-number">전화번호</label>
                            <input type="tel" className="form-control" id="bride-phone-number" placeholder="010-1234-5678"
                                value={data.getIn(['bride', 'phoneNumber'])}
                                onChange={(e) => { this.setState({ data: data.setIn(['bride', 'phoneNumber'], e.target.value) }); }} />
                        </div>
                    </div>
                    <div className="col">
                        <h2 className="text-center">신랑</h2>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label htmlFor="groom-family-name">성</label>
                                <input type="text" className="form-control" id="groom-family-name" placeholder="이"
                                    value={data.getIn(['groom', 'familyName'])}
                                    onChange={(e) => { this.setState({ data: data.setIn(['groom', 'familyName'], e.target.value) }); }} />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="groom-first-name">이름</label>
                                <input type="text" className="form-control" id="groom-first-name" placeholder="몽룡"
                                    value={data.getIn(['groom', 'firstName'])}
                                    onChange={(e) => { this.setState({ data: data.setIn(['groom', 'firstName'], e.target.value) }); }} />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="groom-appellation">호칭</label>
                                <input type="text" className="form-control" id="groom-appellation" placeholder="장남/차남/..."
                                    value={data.getIn(['groom', 'appellation'])}
                                    onChange={(e) => { this.setState({ data: data.setIn(['groom', 'appellation'], e.target.value) }); }} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="groom-father-name">아버님 성함</label>
                            <input type="text" className="form-control" id="groom-father-name" placeholder="아버님"
                                value={data.getIn(['groom', 'fatherName'])}
                                onChange={(e) => { this.setState({ data: data.setIn(['groom', 'fatherName'], e.target.value) }); }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="groom-mother-name">어머님 성함</label>
                            <input type="text" className="form-control" id="groom-mother-name" placeholder="어머님"
                                value={data.getIn(['groom', 'motherName'])}
                                onChange={(e) => { this.setState({ data: data.setIn(['groom', 'motherName'], e.target.value) }); }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="groom-phone-number">전화번호</label>
                            <input type="tel" className="form-control" id="groom-phone-number" placeholder="010-5678-1234"
                                value={data.getIn(['groom', 'phoneNumber'])}
                                onChange={(e) => { this.setState({ data: data.setIn(['groom', 'phoneNumber'], e.target.value) }); }} />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="text-center">
                    <h2>인사말</h2>
                    <textarea className="form-control" rows="3" placeholder="ex) 부디 참석하시어 많은 축복과 격려해 주십시오."
                        value={data.get('greetingText')}
                        onChange={(e) => { this.setState({ data: data.set('greetingText', e.target.value) }); }} />
                </div>
                <hr />
                <WeddingHallSearchMap weddingPlace={data.get('weddingPlace').toJS()} onSelectWeddingPlace={this.selectWeddingPlace.bind(this)} />
            </div>
        );
    }

    selectWeddingPlace(place) {
        const { data } = this.state;

        this.setState({ data: data.set('weddingPlace', place) });
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
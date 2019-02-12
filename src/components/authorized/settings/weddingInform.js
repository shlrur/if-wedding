import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setWeddingInformation } from '../../../redux/actions/authentication';
import WeddingHallSearchMap from './weddingHallSearchMap';

class WeddingInformation extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="wedding-information container">
                <div className="row couple-information">
                    <div className="col">
                        <h2 className="text-center">신부</h2>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label htmlFor="bride-family-name">성</label>
                                <input type="text" className="form-control" id="bride-family-name" placeholder="성" />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="bride-first-name">이름</label>
                                <input type="text" className="form-control" id="bride-first-name" placeholder="춘향" />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="bride-appellation">호칭</label>
                                <input type="text" className="form-control" id="bride-appellation" placeholder="장녀/차녀/..." />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="bride-father-name">아버님 성함</label>
                            <input type="text" className="form-control" id="bride-father-name" placeholder="아버님" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bride-mother-name">어머님 성함</label>
                            <input type="text" className="form-control" id="bride-mother-name" placeholder="어머님" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bride-phone-number">전화번호</label>
                            <input type="tel" className="form-control" id="bride-phone-number" placeholder="010-1234-5678" />
                        </div>
                    </div>
                    <div className="col">
                        <h2 className="text-center">신랑</h2>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <label htmlFor="groom-family-name">성</label>
                                <input type="text" className="form-control" id="groom-family-name" placeholder="이" />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="groom-first-name">이름</label>
                                <input type="text" className="form-control" id="groom-first-name" placeholder="몽룡" />
                            </div>
                            <div className="form-group col-md-5">
                                <label htmlFor="groom-appellation">호칭</label>
                                <input type="text" className="form-control" id="groom-appellation" placeholder="장남/차남/..." />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="groom-father-name">아버님 성함</label>
                            <input type="text" className="form-control" id="groom-father-name" placeholder="아버님" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="groom-mother-name">어머님 성함</label>
                            <input type="text" className="form-control" id="groom-mother-name" placeholder="어머님" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="groom-phone-number">전화번호</label>
                            <input type="tel" className="form-control" id="groom-phone-number" placeholder="010-5678-1234" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="text-center">
                    <h2>인사말</h2>
                    <textarea className="form-control" rows="3" placeholder="ex) 부디 참석하시어 많은 축복과 격려해 주십시오."></textarea>
                </div>
                <hr />
                <WeddingHallSearchMap></WeddingHallSearchMap>
            </div>
        );
    }

    componentDidMount() {
        
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
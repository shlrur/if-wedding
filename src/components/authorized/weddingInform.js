import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setWeddingInformation } from '../../redux/actions/authentication';

class WeddingInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchKeyword: ''
        };
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
                <div className="text-center">
                    <h2>결혼식 장소</h2>
                    <div className="row wedding-hall-map">
                        <div id="map" />
                        <div id="map-search">
                            <div className="search-keyword">
                                <input type="text" value={this.state.searchKeyword} onChange={this.searchKeywordChange.bind(this)} />
                                <button onClick={this.placeSearch.bind(this)}>찾기</button>
                            </div>
                            <ul>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const el = document.getElementById('map');
        this.map = new window.daum.maps.Map(el, {
            center: new window.daum.maps.LatLng(33.450701, 126.570667)
        });

        this.ps = new window.daum.maps.services.Places();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.map.setCenter(new window.daum.maps.LatLng(position.coords.latitude, position.coords.longitude));
            });
        }
    }

    placeSearch() {
        console.log(this.state.searchKeyword);
        if (!this.state.searchKeyword.replace(/^\s+|\s+$/g, '')) {
            console.log('no keyword');

            return;
        }

        this.ps.keywordSearch(this.state.searchKeyword, this.placesSearchCB);
    }

    searchKeywordChange(e) {
        this.setState({
            searchKeyword: e.target.value
        });
    }

    placesSearchCB(data, status, pagination) {
        if (status === window.daum.maps.services.Status.OK) {
            console.log('searched');
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            //displayPlaces(data);
            // 페이지 번호를 표출합니다
            //displayPagination(pagination);

        } else if (status === window.daum.maps.services.Status.ZERO_RESULT) {

            console.log('검색 결과가 존재하지 않습니다.');
            return;

        } else if (status === window.daum.maps.services.Status.ERROR) {

            console.log('검색 결과 중 오류가 발생했습니다.');
            return;

        }
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
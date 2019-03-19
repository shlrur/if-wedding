import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import i18n from '../../../../i18n/i18n';

import icon from '../../../../../assets/images/icon/icon_weddinghall.png';

class BrightMap1View extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weddingPlace: null
        };
    }

    render() {
        const { weddingPlace } = this.state;
        let selectedPlaceJSX = null;

        if (weddingPlace) {
            let address;

            if (weddingPlace.road_address_name) {
                address = (
                    <div className="address">
                        <span>{weddingPlace.road_address_name}</span>
                        <span className="jibun gray">{weddingPlace.address_name}</span>
                    </div>
                );
            } else {
                address = (
                    <div className="address">
                        <span>{weddingPlace.address_name}</span>
                    </div>
                );
            }

            selectedPlaceJSX = (
                <div className="info">
                    <h5>{weddingPlace.place_name}</h5>
                    {address}
                    <span className="tel">{weddingPlace.phone}</span>
                </div>
            );
        } else {
            // if (i18n.language === 'en') {
            //     selectedPlaceJSX = (
            //         <div>
            //             {i18n.t('widgets.map_1.pleaseSelect')}
            //             <Link className="btn btn-secondary" role="button" to="/auth/settings/weddinginform">{i18n.t('widgets.map_1.setting')}</Link>
            //         </div>
            //     );
            // } else {
            //     selectedPlaceJSX = (
            //         <div>
            //             <Link className="btn btn-secondary" role="button" to="/auth/settings/weddinginform">{i18n.t('widgets.map_1.setting')}</Link>
            //             {i18n.t('widgets.map_1.pleaseSelect')}
            //         </div>
            //     );
            // }
            selectedPlaceJSX = (
                <div>
                    there is no place
                </div>
            );
        }

        return (
            <div className="widget-map-bright-1-view">
                {selectedPlaceJSX}
                <div id={`${this.props.inform.id}-map`} className="map"></div>
            </div>
        );
    }

    componentDidMount() {
        const userWeddingPlace = this.props.user.weddingInformation.weddingPlace;
        const widgetWeddingPlace = this.props.inform.configs.weddingPlace;
        const weddingPlace = widgetWeddingPlace ? widgetWeddingPlace : userWeddingPlace;

        this.setState({ weddingPlace });

        const el = document.getElementById(`${this.props.inform.id}-map`);
        this.map = new window.daum.maps.Map(el, {
            center: new window.daum.maps.LatLng(33.450701, 126.570667)
        });
        this.markers = [];
        this.ps = new window.daum.maps.services.Places();
        this.infowindow = new window.daum.maps.InfoWindow({ zIndex: 1 });

        if (weddingPlace) {
            const placePosition = new window.daum.maps.LatLng(weddingPlace.y, weddingPlace.x);

            var imageSrc = icon, // 마커이미지의 주소입니다
                imageSize = new window.daum.maps.Size(64, 69), // 마커이미지의 크기입니다
                imageOption = { offset: new window.daum.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

            // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
            var markerImage = new window.daum.maps.MarkerImage(imageSrc, imageSize, imageOption);

            // 마커를 생성합니다
            var marker = new window.daum.maps.Marker({
                position: placePosition,
                image: markerImage // 마커이미지 설정 
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(this.map);
            this.map.setCenter(placePosition);
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.map.setCenter(new window.daum.maps.LatLng(position.coords.latitude, position.coords.longitude));
            });
        }
    }
}

const mapStateToProps = state => ({
    user: state.authentication.user
});
const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrightMap1View);
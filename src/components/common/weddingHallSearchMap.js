import React, { Component } from 'react';

import _ from 'lodash';
import i18n from '../../i18n/i18n';

import icon from '../../../assets/images/icon/icon_weddinghall.png';

export default class WeddingHallSearchMap extends Component {
    constructor(props) {
        super(props);

        this.debounced = _.debounce(this.submitFormHandler.bind(this), 1000);
        this.valueForPreventDuplicated = '';

        this.state = {
            searchKeyword: '',
            searchedPlaces: [],
            markers: [],
            selectedPlace: this.props.weddingPlace
        };
    }
    render() {
        let selectedPlaceJSX = null;

        if (this.state.selectedPlace) {
            let place = this.state.selectedPlace;
            let address;

            if (place.road_address_name) {
                address = (
                    <div className="address">
                        <span>{place.road_address_name}</span>
                        <span className="jibun gray">{place.address_name}</span>
                    </div>
                );
            } else {
                address = (
                    <div className="address">
                        <span>{place.address_name}</span>
                    </div>
                );
            }

            selectedPlaceJSX = (
                <div className="info">
                    <h5>{place.place_name}</h5>
                    {address}
                    <span className="tel">{place.phone}</span>
                </div>
            );
        } else {
            selectedPlaceJSX = (
                <div>
                    {i18n.t('weddingInform.selectWedddingPlace')}
                </div>
            );
        }

        return (
            <div className="text-center h-100">
                {selectedPlaceJSX}
                <div className="row wedding-hall-map">
                    <div id="map" />
                    <div id="map-search">
                        <div className="search-keyword">
                            <span>{i18n.t('weddingInform.search')}</span>
                            <input type="text" value={this.state.searchKeyword} onChange={this.searchKeywordChange.bind(this)} />
                        </div>
                        <ul id="placesList">
                            {
                                this.state.searchedPlaces.map((place, ind) => {
                                    let address;
                                    if (place.road_address_name) {
                                        address = (
                                            <div className="address">
                                                <span>{place.road_address_name}</span>
                                                <span className="jibun gray">{place.address_name}</span>
                                            </div>
                                        );
                                    } else {
                                        address = (
                                            <div className="address">
                                                <span>{place.address_name}</span>
                                            </div>
                                        );
                                    }

                                    return (
                                        <li className="item" key={ind}
                                            onClick={this.searchedPlacesClickHandler.bind(this, ind)}
                                            onMouseOver={this.searchedPlacesMouseOverHandler.bind(this, ind)}
                                            onMouseOut={this.searchedPlacesMouseOutHandler.bind(this)}>
                                            <div className="info">
                                                <h5>{place.place_name}</h5>
                                                {address}
                                                <span className="tel">{place.phone}</span>
                                            </div>
                                            <button onClick={this.selectPlaceHandler.bind(this, ind)}>선택</button>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <div id="pagination"></div>
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
        this.markers = [];
        this.ps = new window.daum.maps.services.Places();
        this.infowindow = new window.daum.maps.InfoWindow({ zIndex: 1 });

        if (this.state.selectedPlace) {
            const { selectedPlace } = this.state;
            const placePosition = new window.daum.maps.LatLng(selectedPlace.y, selectedPlace.x);

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

    searchedPlacesClickHandler(ind) {
        this.map.setLevel(4, { animate: true });
        this.map.setCenter(new window.daum.maps.LatLng(Number(this.state.searchedPlaces[ind].y), Number(this.state.searchedPlaces[ind].x)));
    }

    searchedPlacesMouseOverHandler(ind) {
        this.displayInfowindow(this.state.markers[ind], this.state.searchedPlaces[ind].place_name);
        this.map.setCenter(new window.daum.maps.LatLng(Number(this.state.searchedPlaces[ind].y), Number(this.state.searchedPlaces[ind].x)));
    }

    searchedPlacesMouseOutHandler() {
        this.infowindow.close();
    }

    selectPlaceHandler(ind) {
        this.setState({
            selectedPlace: this.state.searchedPlaces[ind]
        });

        this.props.onSelectWeddingPlace(this.state.searchedPlaces[ind]);
    }

    submitFormHandler() {
        if(this.valueForPreventDuplicated === this.state.searchKeyword) {
            return;
        }

        if (!this.state.searchKeyword.replace(/^\s+|\s+$/g, '')) {
            console.log('no keyword');

            return;
        }
        this.valueForPreventDuplicated = this.state.searchKeyword;
        this.ps.keywordSearch(this.state.searchKeyword, this.placesSearchCB.bind(this));
    }

    searchKeywordChange(e) {
        this.setState({
            searchKeyword: e.target.value
        });

        this.debounced();
    }

    placesSearchCB(data, status, pagination) {
        if (status === window.daum.maps.services.Status.OK) {
            console.log('searched');
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            this.displayPlaces(data);
            // 페이지 번호를 표출합니다
            this.displayPagination(pagination);

        } else if (status === window.daum.maps.services.Status.ZERO_RESULT) {

            console.log('검색 결과가 존재하지 않습니다.');
            return;

        } else if (status === window.daum.maps.services.Status.ERROR) {

            console.log('검색 결과 중 오류가 발생했습니다.');
            return;

        }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    displayPlaces(places) {
        var menuEl = document.getElementById('placesList'),
            bounds = new window.daum.maps.LatLngBounds();

        let searchedPlaces = [];
        let markers = [];

        // 지도에 표시되고 있는 마커를 제거합니다
        this.removeMarker();

        for (var i = 0; i < places.length; i++) {

            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new window.daum.maps.LatLng(places[i].y, places[i].x),
                marker = this.addMarker(placePosition, i);

            searchedPlaces.push(places[i]);
            markers.push(marker);

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다
            ((marker, title) => {
                window.daum.maps.event.addListener(marker, 'mouseover', () => {
                    this.displayInfowindow(marker, title);
                });

                window.daum.maps.event.addListener(marker, 'mouseout', () => {
                    this.infowindow.close();
                });

                // itemEl.onmouseover = () => {
                //     this.displayInfowindow(marker, title);
                // };

                // itemEl.onmouseout = () => {
                //     this.infowindow.close();
                // };
            })(marker, places[i].place_name);
        }

        // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
        // listEl.appendChild(fragment);
        this.setState({ searchedPlaces, markers });
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        this.map.setBounds(bounds);
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker(position, idx, /*title*/) {
        var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new window.daum.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions = {
                spriteSize: new window.daum.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin: new window.daum.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new window.daum.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new window.daum.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new window.daum.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage
            });

        marker.setMap(this.map); // 지도 위에 마커를 표출합니다
        this.markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    displayPagination(pagination) {
        var paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
            var el = document.createElement('a');
            el.innerHTML = i;

            if (i === pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = ((i) => {
                    return () => {
                        pagination.gotoPage(i);
                    };
                })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
    // 인포윈도우에 장소명을 표시합니다
    displayInfowindow(marker, title) {
        var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

        this.infowindow.setContent(content);
        this.infowindow.open(this.map, marker);
    }
}
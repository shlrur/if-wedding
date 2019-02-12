import React, { Component } from 'react';

export default class WeddingHallSearchMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchKeyword: '',
            searchedPlaces: [],
            markers: []
        };
    }
    render() {
        return (
            <div className="text-center">
                <h2>결혼식 장소</h2>
                <div className="row wedding-hall-map">
                    <div id="map" />
                    <div id="map-search">
                        <div className="search-keyword">
                            <input type="text" value={this.state.searchKeyword} onChange={this.searchKeywordChange.bind(this)} />
                            <button onClick={this.placeSearch.bind(this)}>찾기</button>
                        </div>
                        <ul id="placesList">
                            {
                                this.state.searchedPlaces.map((place, ind) => {
                                    if (place.road_address_name) {
                                        return (
                                            <li className="item" key={ind}
                                                onMouseOver={this.searchedPlacesMouseOverHandler.bind(this, ind)}
                                                onMouseOut={this.searchedPlacesMouseOutHandler.bind(this)}>
                                                <span className={`markerbg marker_${ind + 1}`}></span>
                                                <div className="info">
                                                    <h5>{place.place_name}</h5>
                                                    <span>{place.road_address_name}</span>
                                                    <span className="jibun gray">{place.address_name}</span>
                                                    <span className="tel">{place.phone}</span>
                                                </div>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li className="item" key={ind}
                                                onMouseOver={this.searchedPlacesMouseOverHandler.bind(this, ind)}
                                                onMouseOut={this.searchedPlacesMouseOutHandler.bind(this)}>
                                                <span className={`markerbg marker_${ind + 1}`}></span>
                                                <div className="info">
                                                    <h5>{place.place_name}</h5>
                                                    <span>{place.address_name}</span>
                                                    <span className="tel">{place.phone}</span>
                                                </div>
                                            </li>
                                        );
                                    }
                                })
                            }
                        </ul>
                        <div id="pagination">
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
        this.markers = [];
        this.ps = new window.daum.maps.services.Places();
        this.infowindow = new window.daum.maps.InfoWindow({ zIndex: 1 });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.map.setCenter(new window.daum.maps.LatLng(position.coords.latitude, position.coords.longitude));
            });
        }
    }

    searchedPlacesMouseOverHandler(ind) {
        this.displayInfowindow(this.state.markers[ind], this.state.searchedPlaces[ind].place_name);
    }

    searchedPlacesMouseOutHandler() {
        this.infowindow.close();
    }

    placeSearch() {
        if (!this.state.searchKeyword.replace(/^\s+|\s+$/g, '')) {
            console.log('no keyword');

            return;
        }

        this.ps.keywordSearch(this.state.searchKeyword, this.placesSearchCB.bind(this));
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
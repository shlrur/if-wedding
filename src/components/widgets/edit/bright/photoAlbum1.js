import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Compressor from 'compressorjs';
import { Map } from 'immutable';

import {
    addAlbumWidgetImagesRequest
} from '../../../../redux/actions/widgetConfig';

class BrightPhotoalbum1Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: Map({
                showingImageInfos: this.props.inform.configs.showingImageInfos
            }),
            loading: false
        };
    }

    render() {
        const showingImageInfos = this.state.data.get('showingImageInfos');

        return (
            <div className="widget-photo-album-bright-1-edit">
                <input id={`${this.props.inform.id}-setImages`}
                    type="file" multiple accept='image/*' onChange={this.addImagesButtonHandler.bind(this)}></input>
                <div className="edit-image-gallery">
                    {showingImageInfos.map((imageInfo, ind) => {
                        return (
                            <div key={ind} className="edit-image">
                                <label>
                                    <input type="checkbox" checked={imageInfo.isShowing} onChange={this.onChangeHandler.bind(this, ind)} />
                                    <img src={imageInfo.thumbnail.fileUrl} />
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        let widgetProp = nextProps.useWidgets.filter((useWidget) => {
            return useWidget.id === this.props.inform.id;
        })[0];

        if (!_.isEqual(this.state.showingImageInfos, widgetProp.configs.showingImageInfos)) {
            this.setState({
                showingImageInfos: widgetProp.configs.showingImageInfos,
            });
        }

        this.setState({
            loading: nextProps.loadings[this.props.inform.id]
        });
    }

    addImagesButtonHandler(e) {
        // const arr = fromJS([
        //     { a: 1, b: 11 },
        //     { a: 2, b: 22 }
        // ]);

        // const bb = arr.set(4, { a: 3, b: 33 });

        // console.log(arr, bb);

        const images = e.target.files;
        const addingImages = [];

        let i;
        let doneCount = 0;
        const target = e.target;
        const self = this;

        // parallel processing
        for (i = 0; i < images.length; i++) {
            const ind = i;
            const image = images[i];

            new Compressor(image, {
                quality: 0.6,
                success(result) {
                    console.log(ind, image, result);
                    doneCount++;

                    addingImages[ind] = {
                        origin: image,
                        thumbnail: result
                    };

                    // invoke when all parallel processes are done.
                    if (doneCount === images.length) {
                        self.props.addAlbumWidgetImagesRequest(addingImages, self.props.inform.id);

                        target.value = '';
                    }
                },
                error(err) {
                    console.log(err.message);
                },
            });
        }
    }

    onChangeHandler(ind, e) {
        const { data } = this.state;

        this.setState({
            data: data.setIn(['showingImageInfos', ind, 'isShowing'], e.target.checked)
        }, () => {
            console.log(this.state.data.get('showingImageInfos'));
        });
    }
}

const mapStateToProps = state => ({
    useWidgets: state.widget.useWidgets,
    loadings: state.widgetConfig.loadings
});
const mapDispatchToProps = {
    addAlbumWidgetImagesRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrightPhotoalbum1Edit);
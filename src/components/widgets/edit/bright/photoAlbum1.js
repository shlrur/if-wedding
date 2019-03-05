import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import _ from 'lodash';
import Compressor from 'compressorjs';
import ImageGallery from 'react-image-gallery';

import {
    getAlbumWidgetImagesRequest,
    setAlbumWidgetImagesRequest
} from '../../../../redux/actions/widgetConfig';

class BrightPhotoalbum1Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // showingImageInfos: this.props.inform.configs.showingImageInfos
            showingThumbnailInfos: []
        };
    }

    render() {
        // const images = this.state.showingImageInfos.map((imageInfo) => {
        //     return {
        //         original: imageInfo.fileUrl,
        //         thumbnail: imageInfo.fileUrl
        //     };
        // });

        return (
            <div className="widget-photo-album-bright-1">
                <input id={`${this.props.inform.id}-setImages`}
                    type="file" multiple accept='image/*' onChange={this.addImagesButtonHandler.bind(this)}></input>
                { /*<button onClick={this.uploadImages.bind(this)}>upload</button> */}

                { /*<ImageGallery items={images}/> */}
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        // let widgetProp = nextProps.useWidgets.filter((useWidget) => {
        //     return useWidget.id === this.props.inform.id;
        // })[0];

        // if (!_.isEqual(this.state.showingImageInfos, widgetProp.configs.showingImageInfos)) {
        //     this.setState({
        //         showingImageInfos: widgetProp.configs.showingImageInfos
        //     });
        // }
    }

    addImagesButtonHandler(e) {
        // const arr = fromJS([
        //     { a: 1, b: 11 },
        //     { a: 2, b: 22 }
        // ]);

        // const bb = arr.set(4, { a: 3, b: 33 });

        // console.log(arr, bb);

        const images = e.target.files;
        const currentImageLength = this.state.showingThumbnailInfos.length;
        let i;

        // parallel processing
        for (i = 0; i < images.length; i++) {
            const ind = i;
            const targetInd = i + currentImageLength;

            new Compressor(images[i], {
                quality: 0.6,
                success(result) {
                    console.log(ind, targetInd, images[ind], result);
                },
                error(err) {
                    console.log(err.message);
                },
            });
        }
    }

    setImages(e) {
        // TODO: limit file size.
        // this.setState({
        //     addingImages: e.target.files
        // });
    }

    uploadImages() {
        this.props.setAlbumWidgetImagesRequest([...this.state.addingImages], this.props.inform.id);

        this.setState({
            addingImages: []
        });

        document.getElementById(`${this.props.inform.id}-setImages`).value = '';
    }
}

const mapStateToProps = state => ({
    useWidgets: state.widget.useWidgets
});
const mapDispatchToProps = {
    getAlbumWidgetImagesRequest,
    setAlbumWidgetImagesRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrightPhotoalbum1Edit);
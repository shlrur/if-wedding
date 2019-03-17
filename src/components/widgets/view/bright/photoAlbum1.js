import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ImageGallery from 'react-image-gallery';

import {
    getAlbumWidgetImagesRequest
} from '../../../../redux/actions/widgetConfig';

class BrightPhotoalbum1View extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingImages: [],
            showingImageInfos: []
        };
    }

    render() {
        const images = this.state.showingImageInfos
            .filter((imageInfo) => {
                return imageInfo.isShowing;
            })
            .map((imageInfo) => {
                return {
                    original: imageInfo.original.fileUrl,
                    thumbnail: imageInfo.thumbnail.fileUrl
                };
            });

        return (
            <div className="widget-photo-album-bright-1-view">
                <ImageGallery items={images} />
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        let widgetProp = nextProps.useWidgets.filter((useWidget) => {
            return useWidget.id === this.props.inform.id;
        })[0];

        if (!_.isEqual(this.state.showingImageInfos, widgetProp.configs.showingImageInfos)) {
            this.setState({
                showingImageInfos: widgetProp.configs.showingImageInfos
            });
        }
    }
}

const mapDispatchToProps = {
    getAlbumWidgetImagesRequest
};

export default connect(
    null,
    mapDispatchToProps
)(BrightPhotoalbum1View);
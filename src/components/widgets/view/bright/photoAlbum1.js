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
            loading: false,
            showingImageInfos: []
        };
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    loading...
                </div>
            );
        }

        const images = this.state.showingImageInfos
            .filter((imageInfo) => {
                return imageInfo.isShowing;
            })
            .map((imageInfo) => {
                return {
                    original: imageInfo.origin.fileUrl,
                    thumbnail: imageInfo.thumbnail.fileUrl
                };
            });

        return (
            <div className="widget-photo-album-bright-1-view">
                <ImageGallery items={images} />
            </div>
        );
    }

    componentDidMount() {
        this.props.getAlbumWidgetImagesRequest(this.props.inform.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loading: nextProps.loadings[this.props.inform.id],
            showingImageInfos: nextProps.imageInfos[this.props.inform.id] || []
        });
    }
}

const mapStateToProps = state => ({
    imageInfos: state.widgetConfig.imageInfos,
    loadings: state.widgetConfig.loadings
});
const mapDispatchToProps = {
    getAlbumWidgetImagesRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrightPhotoalbum1View);
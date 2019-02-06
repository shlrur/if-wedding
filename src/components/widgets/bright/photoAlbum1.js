import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
    getAlbumWidgetImagesRequest,
    setAlbumWidgetImagesRequest
} from '../../../redux/actions/widgetConfig';

class BrightPhotoalbum1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingImages: [],
            showingImageUrls: []
        };
    }

    render() {
        console.log('test', _.isEqual([1, 2], [2, 1]), _.isEqual([1, 2], [1, 2]));
        return (
            <div>
                <input id={`${this.props.inform.id}-setImages`}
                    type="file" multiple accept='image/*' onChange={this.setImages.bind(this)}></input>
                <button onClick={this.uploadImages.bind(this)}>upload</button>

                {this.showingImageUrls}
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        let widgetProp = nextProps.useWidgets.filter((useWidget) => {
            return useWidget.id === this.props.inform.id;
        })[0];

        if(!_.isEqual(this.state.showingImageUrls, widgetProp.configs.showingImageUrls)) {
            this.setState({
                showingImageUrls: widgetProp.configs.showingImageUrls
            });
        }
    }

    setImages(e) {
        this.setState({
            addingImages: e.target.files
        });
    }

    uploadImages() {
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
)(BrightPhotoalbum1);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Compressor from 'compressorjs';
import { fromJS } from 'immutable';

import {
    getAlbumWidgetImagesRequest,
    addAlbumWidgetImagesRequest,
    setAlbumWidgetImageSelectionRequest
} from '../../../../redux/actions/widgetConfig';

class BrightPhotoalbum1Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: fromJS({
                showingImageInfos: []
            })
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

        const showingImageInfos = this.state.data.get('showingImageInfos').toJS();

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

    componentDidMount() {
        this.props.getAlbumWidgetImagesRequest(this.props.inform.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loading: nextProps.loadings[this.props.inform.id],
            data: fromJS({
                showingImageInfos: nextProps.imageInfos[this.props.inform.id] || []
            })
        });
        // let widgetProp = nextProps.useWidgets.filter((useWidget) => {
        //     return useWidget.id === this.props.inform.id;
        // })[0];

        // if (!_.isEqual(this.state.showingImageInfos, widgetProp.configs.showingImageInfos)) {
        //     this.setState({
        //         showingImageInfos: widgetProp.configs.showingImageInfos,
        //     });
        // }

        // this.setState({
        //     loading: nextProps.loadings[this.props.inform.id]
        // });
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
            console.log(this.state.data.get('showingImageInfos').toJS());
            const showingImageInfos = this.state.data.get('showingImageInfos').toJS();
            this.props.setAlbumWidgetImageSelectionRequest(showingImageInfos[ind].id, showingImageInfos[ind].isShowing, this.props.inform.id);
        });
    }
}

const mapStateToProps = state => ({
    imageInfos: state.widgetConfig.imageInfos,
    loadings: state.widgetConfig.loadings
});
const mapDispatchToProps = {
    getAlbumWidgetImagesRequest,
    addAlbumWidgetImagesRequest,
    setAlbumWidgetImageSelectionRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrightPhotoalbum1Edit);
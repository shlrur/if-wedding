import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import GridLayout from 'react-grid-layout';

import { getWidgetComponent } from '../../widgets/widgets';

Modal.setAppElement('#app');

class DashboardPreview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            useWidgets: []
        };

        this.customStyles = {
            content: {
                // top: '50%',
                // left: '50%',
                // right: 'auto',
                // bottom: 'auto',
                // marginRight: '-50%',
                // transform: 'translate(-50%, -50%)'
                width: '50%'
            }
        };
    }

    render() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal.bind(this)}
                onRequestClose={this.closeModal.bind(this)}
                style={this.customStyles}
                contentLabel="Dashboard Preview Modal" >
                <div className="dashboard-preview">
                    <div className="widget-gallery">
                        <GridLayout
                            className="widget-grids"
                            isDraggable={false} isResizable={false}
                            cols={1} rowHeight={30} width={700}
                            verticalCompact={true} compactType={'vertical'}
                            margin={[0, 10]}
                        >
                            {this.state.useWidgets.map((widgetInform) => {
                                const WidgetComponent = getWidgetComponent(`${widgetInform.theme}_${widgetInform.name}_view`);

                                return (
                                    <div className="widget-grid" key={widgetInform.id} data-grid={widgetInform.layout}>
                                        <WidgetComponent inform={widgetInform} />
                                    </div>
                                );
                            })}
                        </GridLayout>
                    </div>
                </div>
            </Modal>
        );
    }

    showModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    afterOpenModal() {
        this.setState({
            useWidgets: this.props.useWidgets
        });
    }
}

const mapStateToProps = state => ({
    useWidgets: state.widget.useWidgets
});
const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null, { withRef: true }
)(DashboardPreview);
import React, { Component } from 'react';
import { connect } from 'react-redux';

import i18n from '../../../../i18n/i18n';

import {
    getGuestbookWidgetMessagesRequest,
    setGuestbookWidgetMessageRequest
} from '../../../../redux/actions/widgetConfig';

class BrightGuestbook1Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            messages: []
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

        return (
            <div className="widget-guestbook-bright-1">
                <div className="messages">
                    {this.state.messages.map((message) => {
                        return (
                            <div className="message" key={message.id}>
                                <div className="author">{message.author}</div>
                                <div className="message">{message.message}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="input-message">
                    <form onSubmit={this.submitMessageHandler.bind(this)}>
                        <div className="form-row">
                            <div className="col-md-3">
                                <input type="text" className="form-control" placeholder={i18n.t('widgets.guestbook_1.placeholder.name')} required />
                            </div>
                            <div className="col-md-7">
                                <textarea className="form-control" placeholder={i18n.t('widgets.guestbook_1.placeholder.message')} rows="1" required />
                            </div>
                            <div className="col-md-2">
                                <button type="submit" className="btn btn-success">{i18n.t('widgets.guestbook_1.placeholder.input')}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.getGuestbookWidgetMessagesRequest(this.props.inform.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            loading: nextProps.loadings[this.props.inform.id],
            messages: nextProps.guestbookMessages[this.props.inform.id] || []
        });
    }

    submitMessageHandler(event) {
        event.preventDefault();

        const author = event.target[0].value.replace(/^\s+|\s+$/g, '');
        const message = event.target[1].value.replace(/^\s+|\s+$/g, '');

        if (!author || !message) {
            // TODO: show toast
            console.log('no author or message');

            return;
        }

        this.props.setGuestbookWidgetMessageRequest({
            author, message
        }, this.props.inform.id);
    }
}

const mapStateToProps = state => ({
    loadings: state.widgetConfig.loadings,
    guestbookMessages: state.widgetConfig.guestbookMessages
});
const mapDispatchToProps = {
    getGuestbookWidgetMessagesRequest,
    setGuestbookWidgetMessageRequest
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BrightGuestbook1Edit);
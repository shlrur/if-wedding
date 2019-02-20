import React, { Component } from 'react';

import i18n from '../../i18n/i18n';

export default class ContactUs extends Component {
    render() {
        return (
            <div className="container contact-us">
                <h4 className="my-4 text-center">{i18n.t('nonauth.contactus')}</h4>
                <form onSubmit={this.submitFormHandler}>
                    <div className="form-row">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder={i18n.t('nonauth.name')} id="name" />
                            <input type="email" className="form-control mt-1" placeholder={i18n.t('nonauth.email')} id="email" />
                            <input type="tel" className="form-control mt-1" placeholder={i18n.t('nonauth.phone')} id="number" />
                        </div>
                        <div className="col-md-6">
                            <textarea className="form-control h-100" placeholder={i18n.t('nonauth.contents')} id="content" />
                        </div>
                    </div>
                    <button type="submit" className="mt-3 btn btn-success disabled">{i18n.t('nonauth.sendemail')}</button>
                </form>
            </div>
        );
    }

    submitFormHandler(event) {
        event.preventDefault();
    }
}
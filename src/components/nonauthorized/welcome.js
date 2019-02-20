import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import i18n from '../../i18n/i18n';

export default class Welcome extends Component {
    render() {
        return (
            <main role="main" className="inner cover">
                <h1 className="cover-heading">{i18n.t('nonauth.congratulation')}</h1>
                <p>{i18n.t('nonauth.forfree')}</p>
                <p>
                    <Link className="btn btn-lg btn-secondary" to="/login">{i18n.t('nonauth.start')}</Link>
                </p>
            </main>
        );
    }
}
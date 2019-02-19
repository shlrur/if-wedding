import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import i18n from '../../i18n/i18n';

export default class Welcome extends Component {
    render() {
        return (
            <main role="main" className="inner cover">
                <h1 className="cover-heading">{i18n.t('label.congratulation')}</h1>
                <p>무료로 청첩장을 직접 만들어보세요.</p>
                <p>
                    <Link className="btn btn-lg btn-secondary" to="/login">Start</Link>
                </p>
            </main>
        );
    }
}
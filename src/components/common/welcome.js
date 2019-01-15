import React, { Component } from 'react';

// import background from '../../../assets/images/index.jpg';

export default class Welcome extends Component {
    render() {
        return (
            <main role="main" className="inner cover">
                <h1 className="cover-heading">당신의 결혼을 축하드립니다.</h1>
                <p className="lead">자신만의 청첩장을 직접 만들어보세요. 무료입니다.</p>
                <p className="lead">
                    <a href="#" className="btn btn-lg btn-secondary">Start</a>
                </p>
            </main>
        );
    }
}
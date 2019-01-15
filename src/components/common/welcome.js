import React, { Component } from 'react';

// import background from '../../../assets/images/index.jpg';

export default class Welcome extends Component {
    render() {
        return (
            <div className="cover-container welcome-background text-center d-flex w-100 h-100 p-3 mx-auto flex-column">
                <header className="masthead mb-auto">
                    <div className="inner">
                        <h3 className="masthead-brand">If Wedding</h3>
                        <nav className="nav nav-masthead justify-content-center">
                            <a className="nav-link active" href="#">Welcome</a>
                            <a className="nav-link" href="#">Features</a>
                            <a className="nav-link" href="#">Contact</a>
                            <a className="nav-link" href="#">Sign up&in</a>
                        </nav>
                    </div>
                </header>

                <main role="main" className="inner cover">
                    <h1 className="cover-heading">당신의 결혼을 축하드립니다.</h1>
                    <p className="lead">자신만의 청첩장을 직접 만들어보세요. 무료입니다.</p>
                    <p className="lead">
                        <a href="#" className="btn btn-lg btn-secondary">Start</a>
                    </p>
                </main>

                <footer className="mastfoot mt-auto">
                    <div className="inner">
                        <p>ing... <a href="">Ing</a>, by <a href="">@ing...</a>.</p>
                    </div>
                </footer>
            </div>
        );
    }
}
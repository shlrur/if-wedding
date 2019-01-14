import React, { Component } from 'react';

import googleLogo from '../../../assets/images/google.jpg';

export default class Welcome extends Component {
    render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand text-center" href="#">ifWedding</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Log In</a>
                            </li>

                        </ul>
                    </div>
                </nav>

                <div className="jumbotron jumbotron-fluid main-background">
                    <div className="container">
                        <h1 className="display-4">Congraturation!!</h1>
                        <p className="lead">당신의 결혼을 축하드립니다.</p>
                        <hr className="my-4" />
                        <p>당신만의 청첩장을 만드세요. 공짜입니다.</p>
                        <a className="btn btn-primary btn-lg" href="#" role="button">Login</a>
                    </div>
                </div>

                <div className="container text-center">
                    <h4 className="my-4">Start with</h4>
                    <div className="row">
                        <div className="col-md-4">
                            <img className="login-btn mt-4" src={googleLogo} />
                            <h4 className="mt-4">Google login</h4>
                            <p>login with google</p>
                        </div>
                        <div className="col-md-4">
                            <img className="login-btn mt-4" src="assets/images/facebook.png" />
                            <h4 className="mt-4">Facebook login</h4>
                            <p>login with facebook</p>
                        </div>
                        <div className="col-md-4">
                            <img className="login-btn mt-4" src="assets/images/twitter.png" />
                            <h4 className="mt-4">Twitter login</h4>
                            <p>login with twitter</p>
                        </div>
                    </div>
                </div>

                <div className="container my-4">
                    <h4 className="my-3 text-center">Contact Us</h4>
                    <form>
                        <div className="form-row">
                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="Your Name" />
                                <input type="email" className="form-control mt-1" placeholder="Your Email" />
                                <input type="number" className="form-control mt-1" placeholder="Your Phone" />
                            </div>
                            <div className="col-md-6">
                                <textarea className="form-control h-100" placeholder="Required example textarea" ></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
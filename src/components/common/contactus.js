import React, { Component } from 'react';

// import background from '../../../assets/images/index.jpg';

export default class ContactUs extends Component {
    render() {
        return (
            <div className="container">
                <h4 className="my-3 text-center">Contact Us</h4>
                <form>
                    <div className="form-row">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Your Name" />
                            <input type="email" className="form-control mt-1" placeholder="Your Email" />
                            <input type="number" className="form-control mt-1" placeholder="Your Phone" />
                        </div>
                        <div className="col-md-6">
                            <textarea className="form-control h-100" placeholder="May I help you?" ></textarea>
                        </div>
                    </div>
                    <button type="submit" className="mt-3 btn btn-success">Send E-mail</button>
                </form>
            </div>
        );
    }
}
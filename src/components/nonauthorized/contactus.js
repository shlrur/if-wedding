import React, { Component } from 'react';

// import background from '../../../assets/images/index.jpg';

export default class ContactUs extends Component {
    render() {
        return (
            <div className="container contact-us">
                <h4 className="my-4 text-center">Contact Us</h4>
                <form onSubmit={this.submitFormHandler}>
                    <div className="form-row">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Name" id="name" />
                            <input type="email" className="form-control mt-1" placeholder="Email" id="email" />
                            <input type="tel" className="form-control mt-1" placeholder="Phone" id="number" />
                        </div>
                        <div className="col-md-6">
                            <textarea className="form-control h-100" placeholder="May I help you?" id="content" />
                        </div>
                    </div>
                    <button type="submit" className="mt-3 btn btn-success disabled">Send E-mail</button>
                </form>
            </div>
        );
    }

    submitFormHandler(event) {
        event.preventDefault();
    }
}
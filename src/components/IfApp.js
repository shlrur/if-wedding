import React, { Component } from 'react';

import Authentication from './authentication';
import Dashboard from './dashboard';

class IfApp extends Component {
    render() {
        return (
            <div>
                <Dashboard />
            </div>
        );
    }
}

export default IfApp;
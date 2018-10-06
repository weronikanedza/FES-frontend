import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './LoginForm';

class App extends Component {
    render() {
        return (
            <Router >
            <div>        
                <Route exact path="/login" component={LoginForm} />
            </div>
            </Router>
        );
    }
}

export default App;
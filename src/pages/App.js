import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginForm from './user/LoginForm';
import Register from './user/Register';
import ResetPassword from './user/ResetPassword';
import Home from './user/Home';

class App extends Component {
    render() {
        return (
            <Router >
            <div>        
            <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={LoginForm} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/resetPassword" component={ResetPassword} />
            </div>
            </Router>
        );
    }
}

export default App;
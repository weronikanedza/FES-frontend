import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './user/Login';
import Register from './user/Register';
import ResetPassword from './user/ResetPassword';
import User from './user/User';
import RegistrationConfirmation from '././message/RegistrationConfirmation';
import RegistrationMessage from '././message/RegistrationMessage';
import UploadFile from "./user/UploadFile";
import EditData from "./user/EditData";
import ChangePassword from "./user/ChangePassword";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={User}/>
                    <Route exact path="/user" component={User}/>
                    <Route exact path="/user/uploadFile" component={UploadFile} />
                    <Route exact path="/editData" component={EditData}/>
                    <Route exact path="/changePassword" component={ChangePassword}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/register/message" component={RegistrationMessage}/>
                    <Route exact path="/registration/confirm" component={RegistrationConfirmation}/>
                    <Route exact path="/resetPassword" component={ResetPassword}/>
                </div>
            </Router>
        );
    }
}

export default App;
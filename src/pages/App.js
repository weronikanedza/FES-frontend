import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginForm from './user/LoginForm';
import Register from './user/Register';
import ResetPassword from './user/ResetPassword';
import User from './user/User';
import RegistrationConfirmation from '././message/RegistrationConfirmation';
import RegistrationMessage from '././message/RegistrationMessage';
import {PrivateRoute} from '././authentication/PrivateRoute';
import UploadFileForm from "./user/UploadFileForm";
import EditData from "./user/EditData";
import ChangePassword from "./user/ChangePassword";

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <PrivateRoute exact path="/" component={User}/>
                    <PrivateRoute exact path="/user" component={User}/>
                    <PrivateRoute exact path="/user/uploadFile" component={UploadFileForm} />
                    <PrivateRoute exact path="/editData" component={EditData}/>
                    <PrivateRoute exact path="/changePassword" component={ChangePassword}/>
                    <Route exact path="/login" component={LoginForm}/>
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
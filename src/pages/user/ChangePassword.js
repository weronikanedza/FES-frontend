import React, {Component} from "react";
import Header from "./Header";
import {Button, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import "../../styles/user/ChangePassword.css";
import {
    displayErrorMessage,
    postAxios, signout,
    validatePasswordsEquality,
    validatePasswordStrength
} from "../../helper/helperFunctions";

const formStyle =

    {
        width: '400px',
        margin: '0'
    };


export default class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmedNewPassword: '',
            errorDisplay: {display: 'none'},
            errorMessage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.validateIsNotBlank = this.validateIsNotBlank.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleResponse=()=>{
        signout();
    };

    handleError=(error) => {
        displayErrorMessage(this,error.response.data.message)
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // if(this.validateIsNotBlank() &&
        // validatePasswordsEquality(this,this.state.newPassword,this.state.confirmedNewPassword) &&
        // validatePasswordStrength(this,this.state.newPassword) ){
            const passwordChange={
                id: localStorage.getItem('id'),
                currentPassword: this.state.currentPassword,
                newPassword: this.state.newPassword
            };
            postAxios(this,passwordChange,'changePassword',this.handleResponse,this.handleError);
     //   }
    };

    validateIsNotBlank() {
        if (this.state.currentPassword.length > 0 && this.state.newPassword.length > 0
            && this.state.confirmedNewPassword.length > 0) {
            return true;
        }

        displayErrorMessage(this,'Wszystkie pola muszą zostać uzupełnione');
        return false;
    }

    render() {
        return (<div><Header/>
            <div className="change-password-box">
                <div className="password-text-box">
                    Zmiana hasła
                </div>
                <form className="change-password-form" onSubmit={this.handleSubmit}>
                    <FormGroup
                        controlId="currentPassword"
                    >
                        <ControlLabel>Obecne hasło:</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.currentPassword}
                            onChange={this.handleChange}
                            style={formStyle}
                        />
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup
                        controlId="newPassword"
                    >
                        <ControlLabel>Nowe hasło:</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.newPassword}
                            onChange={this.handleChange}
                            style={formStyle}
                        />
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup
                        controlId="confirmedNewPassword"
                    >
                        <ControlLabel>Powtórz nowe hasło:</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.confirmedNewPassword}
                            onChange={this.handleChange}
                            style={formStyle}
                        />
                        <FormControl.Feedback/>
                    </FormGroup>
                    <Button
                        bsStyle="info"
                        style={
                            {
                                margin: '0',
                                width: '100%'
                            }
                        }
                        type="submit">
                        ZMIEŃ HASŁO
                    </Button>
                </form>
            </div>
            <div className="change-password-warning" style={this.state.errorDisplay}>
                <div className="change-password-warning-text">{this.state.errorMessage}</div>
            </div>
        </div>);
    }
}
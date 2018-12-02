import React, {Component} from "react";
import '../../styles/user/resetPassword.css'
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {resetPasswordButtonStyle} from "../../styles/modalStyle";
import {displayMessage} from "../../helper/helperFunctions";
import axios from "axios";

export default class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            messageDisplay: {display: 'none'},
            message: '',
            buttonDisabled: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.handleError = this.handleError.bind(this);
    }

postAxios(data,url) {

        axios({
            method: 'post',
            url: `http://localhost:8080/${url}`,
            data: data,
            config: {headers: {'Content-Type': 'application/json'}}
        })
            .then( () => {
                this.handleResponse();
            })
            .catch(error => {
                if(error.response)
                this.handleError(error.response.data.message);
            });
    }

    handleChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    handleResponse() {
        this.setState  ({
            buttonDisabled: true
        });
        displayMessage(this, 'Nowe hasło zostało wysłane na podany email', 'green');
    };

    handleError(data) {
            displayMessage(this, data, 'red');
    };

    handleSubmit(event){
        event.preventDefault();
        this.postAxios( this.state.email, 'resetPassword')
    };

    render() {
        return (
            <div className="bodyBox">
                <div className="reset-password-box">
                    <form className="reset-password-form" onSubmit={this.handleSubmit}>
                        <FormGroup
                            controlId="currentPassword"
                        >
                            <ControlLabel>Podaj email na który zostanie wysłane nowe hasło</ControlLabel>
                            <FormControl
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <Button
                            type="submit"
                            bsStyle="info"
                            disabled={this.state.buttonDisabled}
                            style={resetPasswordButtonStyle}>
                            ZRESETUJ HASŁO
                        </Button>
                    </form>
                </div>
                <div className="reset-password-warning" style={this.state.messageDisplay}>
                    <div className="reset-password-text"> {this.state.message} </div>
                </div>
            </div>);
    }
}
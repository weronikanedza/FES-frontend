import React, {Component} from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import axios from "axios";

import '../../styles/user/resetPassword.css'
import {resetPasswordButtonStyle} from "../../styles/user/modalStyle";
import {displayMessage} from "../../helper/helperFunctions";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            messageDisplay: {display: 'none'},
            message: '',
            buttonDisabled: false
        };
    }

    postAxios(data, url) {
        axios({
            method: 'post',
            url: `http://localhost:8080/${url}`,
            data: data,
            config: {headers: {'Content-Type': 'application/json'}}
        })
            .then(() => {
                this.handleResponse();
            })
            .catch(error => {
                if (error.response)
                    this.handleError(error.response.data.message);
            });
    }

    handleChange = (event) => {
        this.setState({
            email: event.target.value
        })
    };

    handleResponse = () => {
        this.setState({
            buttonDisabled: true
        });
        displayMessage(this, 'Nowe hasło zostało wysłane na podany email', 'green');
        setTimeout(function () {
            window.location.href = "./login";
        }, 5000);
    };

    handleError = (data) => {
        displayMessage(this, data, 'red');
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.postAxios(this.state.email, 'resetPassword')
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
                                required
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
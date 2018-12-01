import React, {Component} from "react";
import '../../styles/user/resetPassword.css'
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {resetPasswordButtonStyle} from "../../styles/modalStyle";
import {postAxios} from "../../helper/helperFunctions";

export default class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            displayMessage: {display: 'none'},
            message: '',
            buttonDisabled: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    handleResponse=() => {
        this.setState = {

        }
    };

    handleError = (error) => {};

    handleSubmit = () => {
      postAxios(this,this.state.email,'resetPassword',this.handleResponse,this.handleError)
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
                            disabled={this.buttonDisabled}
                            style={resetPasswordButtonStyle}>
                            ZRESETUJ HASŁO
                        </Button>
                    </form>
                </div>
                <div className="reset-password-warning" style={this.state.displayMessage} >
                    <div className="reset-password-text"> {this.state.message} </div>
                </div>
            </div>);
    }
}
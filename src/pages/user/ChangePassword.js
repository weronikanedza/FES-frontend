import React, {Component} from "react";
import Header from "./Header";
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmedNewPassword: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    getValidationState = () => {

    };

    handleChange (event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    };



    render() {
        return (<div><Header/>
            <div className="change-password-box">
                <form>
                    <FormGroup
                        controlId="currentPassword"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Obecne hasło:</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.currentPassword}
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback/>
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                    <FormGroup
                        controlId="newPassword"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Obecne hasło:</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.newPassword}
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback/>
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                    <FormGroup
                        controlId="confirmedNewPassword"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Obecne hasło:</ControlLabel>
                        <FormControl
                            type="password"
                            value={this.state.confirmedNewPassword}
                            onChange={this.handleChange}
                        />
                        <FormControl.Feedback/>
                        <HelpBlock>Validation is based on string length.</HelpBlock>
                    </FormGroup>
                </form>
            </div>
        </div>);
    }
}
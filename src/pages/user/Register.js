import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Form } from "react-bootstrap";
import "../../styles/user/Register.css";
import countryList from 'react-select-country-list'
import Select from 'react-select'

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.options = countryList().getData()

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            dateOfBirth: "",
            city: "",
            country: "",
            password: "",
            confirmedPassword: "",
            startDate: moment(),
            options: this.options,
            value: null,
        };
        this.handleClick = this.handleClick.bind(this);
    }


    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleClick() {
        window.location = './register'
    }

    handleChange = (date, value) => {

        this.setState({
            startDate: date,
            value: value

        });
    }

    handleSubmit = event => {
        alert(this.state.password)
        alert(this.state.email)
        event.preventDefault();
    }

    render() {
        return (<div className="registerForm">
            <Form inline onSubmit={this.handleSubmit}>
                <div className="groupPair">
                    <FormGroup controlId="firstName" bsSize="large">
                        <ControlLabel >First Name</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="lastName" bsSize="large">
                        <ControlLabel >Last Name</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                </div>
                <div className="groupPair">
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel >Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />

                    </FormGroup>

                    <FormGroup controlId="dateOfBirth" bsSize="large">
                        <ControlLabel >Date Of Birth</ControlLabel>

                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        />

                    </FormGroup>
                </div>
                <div className="groupPair">
                    <FormGroup controlId="city" bsSize="large">
                        <ControlLabel >City</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.city}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup controlId="Country" bsSize="large">
                        <ControlLabel >Country</ControlLabel>
                        <Select
                            options={this.state.options}
                            value={this.state.value}
                            onChange={this.changeHandler}
                        />
                    </FormGroup>

                </div>
                <div className="groupPair">
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup> 
                <FormGroup controlId="confirmedPassword" bsSize="large">
                        <ControlLabel>Confirm password</ControlLabel>
                        <FormControl
                            value={this.state.confirmedPassword}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                </div>
                <Button
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    bsStyle="warning"
                    type="submit"
                >
                   Register
          </Button>

            </Form>
        </div>);
    }
}
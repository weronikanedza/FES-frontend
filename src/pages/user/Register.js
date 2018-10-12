import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel, Form} from "react-bootstrap";
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
            password: "",
            confirmedPassword: "",
            warning: "",
            startDate: moment(),
            options: this.options,
            country: null,
            disabledWarning: {display: "none"},
            isMounted: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateFormInputsLength = this.validateFormInputsLength.bind(this);
        this.validatePasswordsEquality = this.validatePasswordsEquality.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeCountry = this.handleChangeCountry(this);
    }

    handleClick() {
        window.location = './register'
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleChangeDate(date) {
        this.setState({
            startDate: date,
            dateOfBirth: moment(date).format('DD-MM-YYYY')
        });
    }

    handleChangeCountry(country) {

        if (this.state.isMounted) {
            this.setState({
                country: country
            });
        }
    }

    handleSubmit = event => {
        this.validateForm();
        alert(this.state.password)
        alert(this.state.email)
        event.preventDefault();
    }

    validateForm() {
        return this.validateFormInputsLength() &&
            this.validatePasswordsEquality() &&
            this.validatePasswordStrength();

    }

    validateFormInputsLength() {
        return this.state.email.length > 0 && this.state.password.length > 0 &&
            this.state.firstName.length > 0 && this.state.lastName.length > 0 &&
            this.state.dateOfBirth.length > 0 && this.state.country.length > 0 &&
            this.state.city.length > 0 && this.state.confirmedPassword.length > 0
    }

    validatePasswordsEquality() {
        if (this.state.password === this.state.confirmedPassword) {
            return true;
        } else {
            this.setState({
                warning: "Your passwords are not the same",
                disabledWarning: {display: "block"}
            });
            return false;
        }
    }

    validatePasswordStrength() {
        if (this.state.password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {
            return true;
        } else {
            this.setState({
                warning: "Your password should have : one upper case letter, one lower case letter, one digit, minimum eight characters",
                disabledWarning: {display: "block"}
            });
        }
    }

    render() {
        return (<div className="registerForm">
                <Form inline onSubmit={this.handleSubmit}>
                    <div className="groupPair">
                        <FormGroup controlId="firstName" bsSize="large">
                            <ControlLabel>First Name</ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.firstName}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="lastName" bsSize="large">
                            <ControlLabel>Last Name</ControlLabel>
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
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="dateOfBirth" bsSize="large">
                            <ControlLabel>Date Of Birth</ControlLabel>

                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChangeDate}
                            />
                        </FormGroup>
                    </div>
                    <div className="groupPair">
                        <FormGroup controlId="city" bsSize="large">
                            <ControlLabel>City</ControlLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.state.city}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="Country" bsSize="large">
                            <ControlLabel>Country</ControlLabel>
                            <Select
                                options={this.state.options}
                                value={this.state.value}
                                onChange={this.handleChangeCountry}
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
                        bsStyle="warning"
                        type="submit"
                    >
                        Register
                    </Button>

                </Form>
                <div className="space"></div>
                <div className="warning" style={this.state.disabledWarning}>
                    {this.state.warning}
                </div>
            </div>
        );
    }
}
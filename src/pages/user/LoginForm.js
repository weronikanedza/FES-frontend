import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "../../styles/user/LoginForm.css";
import axios from "axios";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginEmail: "",
            password: "",
            warning: "",
            disabledWarning: {display: "none"}
        };

        this.handleClick = this.handleClick.bind(this);
    }

    validateForm() {
        return this.state.loginEmail.length > 0 && this.state.password.length > 0;
    }

    handleClick() {
        window.location = './register'
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        const loginData ={
            email: this.state.loginEmail,
            password: this.state.password
        };

        axios({
            method: 'post',
            url: 'http://localhost:8080/login',
            data: loginData,
            config: {headers: {'Content-Type': 'application/json'}}
        })
            .then(response => {
                localStorage.setItem('role',response.data.role);
                localStorage.setItem('firstName',response.data.firstName);
                localStorage.setItem('lastName',response.data.lastName);
                localStorage.setItem('id',response.data.id);
                localStorage.setItem('filesType','ALL');
                this.props.history.push("/user");
            })

            .catch(error => {
               this.displayErrorMessage(error.response);
            });
        event.preventDefault();
    };

    displayErrorMessage(response) {
        this.setState({
            warning: response.data.message,
            disabledWarning: {display: "block"}
        });
    }

    render() {
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="loginEmail" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Hasło</ControlLabel>
                        <a href="./resetPassword"> Zapomniałeś hasła ?</a>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        bsStyle="info"
                        type="submit"
                    >
                        Zaloguj się
                    </Button>


                    <div className='register'>
                        <span fontWeight="bold">Jeśli nie posiadasz konta </span>

                        <Button
                            block
                            bsSize="large"
                            onClick={this.handleClick}
                            className="btn btn-warning"
                            bsStyle="primary"
                        >
                            Zarejestruj się
                        </Button>
                    </div>
                </form>

                <div className="space"></div>
                <div className="loginWarning" style={this.state.disabledWarning}>
                    {this.state.warning}
                </div>
            </div>


        );
    }
}
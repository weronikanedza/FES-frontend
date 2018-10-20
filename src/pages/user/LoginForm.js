import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../../styles/user/LoginForm.css";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleClick = this.handleClick.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleClick() {
    window.location = './register'
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    alert(this.state.password)
    alert(this.state.email)
    event.preventDefault();
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="loginEmail" bsSize="large">
            <ControlLabel >Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <a href="./resetPassword"> Forget password ?</a>
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
            Sign in
          </Button>


          <div className='register'>
            <span fontWeight="bold">If you do not have account </span>

            <Button
              block
              bsSize="large"
              onClick={this.handleClick}
              className="btn btn-warning"
              bsStyle="primary"
            >
              Register
          </Button>
          </div>
        </form>
      </div>


    );
  }
}
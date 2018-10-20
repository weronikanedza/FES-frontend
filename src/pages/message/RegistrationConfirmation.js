import React, {Component} from "react";
import "../../styles/message/Message.css";
import axios from "axios";

export default class RegistrationConfirmation extends Component {
    constructor(props) {
        super(props);
        this.postRequest = this.postRequest.bind(this);
    }

    componentDidMount() {
        this.postRequest();
    }

    postRequest() {
        let vtoken = this.props.location.search;
        const tokenIndex = vtoken.indexOf('=');
        let regitoken ={
            token: vtoken.substring(tokenIndex + 1)
        };

        axios({
            method: 'post',
            url: 'http://localhost:8080/register/confirm',
            data: regitoken,
            config: {headers: {'Content-Type': 'application/json'}}
        })
            .then((response) => {
         //       window.location = './register/message'
            })
            .catch(error => {
             //   this.displayErrorMessage(error.response)
            });
    }

    render() {
        return (
            <div className='MessageBox'>

                <div className="RegisterMessage">
                    Your account is acctive.
                    To log in click -> <a href="../login">log in</a>
                </div>
            </div>);
    }
}
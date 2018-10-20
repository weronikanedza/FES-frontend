import React, { Component } from "react";
import "../../styles/message/Message.css";

export default class RegistrationMessage extends Component {
    render() {
        return (
            <div className='MessageBox'>

                <div className="RegisterMessage">
                Email with activation link has been sent.
                    To log in click -> <a href="../login">log in</a>
                </div>
            </div>);
    }
}
import React, { Component } from "react";
import "../../styles/message/Message.css";

export default class RegistrationMessage extends Component {
    render() {
        return (
            <div className="bodyBox">
            <div className='MessageBox'>

                <div className="RegisterMessage">
                Link aktywacyjny został wysłany na podany  e-mail.
                    Aby się zalogować kliknij  <a href="../login">strona logowania</a>
                </div>
            </div>
            </div>);
    }
}
import React, { Component } from "react";
import "../../styles/message/Message.css";

export default class RegistrationMessage extends Component {
    render() {
        return (
            <div className="bodyBox">
            <div className='MessageBox'>

                <div className="RegisterMessage">
                Email z linkiem aktywacyjnym został wysłany na podany email.
                    Aby się zalogować kliknij na załącznik <a href="../login">strona logowania</a>
                </div>
            </div>
            </div>);
    }
}
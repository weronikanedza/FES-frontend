import React, { Component } from "react";
import Header from './Header.js';
import AllFiles from './AllFiles.js';

export default class User extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (<div>
            <Header/>
            <div className="change-password">
            </div>
            <AllFiles/>
        </div>);
    }
}
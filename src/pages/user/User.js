import React, { Component } from "react";
import Header from './Header.js';
import AllFiles from './AllFiles.js';
import axios from 'axios';

export default class User extends Component {
    constructor(props){
        super(props);
        this.state ={
            data: ''
        }

    }

    componentDidMount() {

    }

    render() {
        return (<div>
            <Header/>
            <AllFiles/>
        </div>);
    }
}
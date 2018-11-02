import React, { Component } from "react";
import Header from './Header.js';
import HomeBody from './HomeBody.js';
import axios from 'axios';

export default class User extends Component {
    constructor(props){
        super(props);
        this.state ={
            data: ''
        }

    }

    componentDidMount() {
        axios.get(`https://localhost:8080/getUser`)
            .then(res => {
                const data = res.data;
                this.setState({ data });
            })
    }

    render() {
        return (<div>
            <Header/>
            <HomeBody/>
        </div>);
    }
}
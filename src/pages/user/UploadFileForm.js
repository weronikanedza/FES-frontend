import React, {Component} from "react";
import Header from "./Header";
import "../../styles/user/uploadFile.css";
import {Button} from "react-bootstrap";
import axios from "axios";

export default class UploadFileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: ''
        };

        this.validateFile = this.validateFile.bind(this);
        this.sendFile = this.sendFile.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postData=this.postData.bind(this);
    }

    componentDidMount() {

    }

    handleUploadFile = event => {
        this.setState({file: event.target.files[0]});
    };

    handleSubmit = event => {
        if (!this.validateFile()) {

        } else {
            this.sendFile();
        }

        event.preventDefault();
    };

    validateFile() {
        return this.state.file ? true : false;
    }

    sendFile() {
        let data = new FormData();

        data.append('file', this.state.file);
        data.append('size', this.state.file.size);
        data.append('id', localStorage.getItem('id'));

       this.postData(data);

    }

    postData(data){
        axios({
            method: 'post',
            url: 'http://localhost:8080/uploadFile',
            data: data
        })
            .then(response => {
                console.log(response)
            })

            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (<div>
            <Header/>
            <div className="uploadFileBox">
                <div className="uploadFileTextBox">
                    <p>Dodawanie pliku</p>
                </div>
                <div className="uploadFilePath">
                    <input type="file" name="file" onChange={this.handleUploadFile}/>
                </div>
                <div className="uploadFileDrop"></div>
                <Button
                    block
                    bsSize="large"
                    bsStyle="info"
                    type="submit"
                    onClick={this.handleSubmit}
                >
                    Dodaj plik
                </Button>
            </div>
        </div>);
    }
}
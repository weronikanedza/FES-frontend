import React, {Component} from "react";
import Header from "./Header";
import "../../styles/user/uploadFile.css";
import {Button} from "react-bootstrap";
import axios from "axios";
import ReactDropzone from 'react-dropzone';

export default class UploadFileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            disabledWarning: {
                display: "none",
                color: "red"
            },
            warning: ''
        };

        this.validateFile = this.validateFile.bind(this);
        this.sendFile = this.sendFile.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postData = this.postData.bind(this);
        this.displayWarning = this.displayWarning.bind(this);
    }

    onDrop = (files) => {
        this.setState({file: files[0]})
    };

    handleUploadFile = event => {
        this.setState({file: event.target.files[0]});
    };

    handleSubmit = event => {
        if (this.validateFile()) {
            this.sendFile();
        }
        event.preventDefault();
    };

    validateFile() {
        const fileSizeInMB = this.state.file.size / this.state.file;
        if (!this.state.file) {
            this.displayWarning("Plik nie został dodany", "red");
            return false;
        }

        if (fileSizeInMB > 10) {
            this.displayWarning("Rozmiar pliku przekracza 10MB", "red");
            return false;
        }
        return true;
    }

    displayWarning(warning, color) {
        this.setState({
            warning: warning,
            disabledWarning: {
                display: "block",
                color: color
            }
        });
    }

    sendFile() {
        let data = new FormData();

        data.append('file', this.state.file);
        data.append('size', this.state.file.size);
        data.append('id', localStorage.getItem('id'));

        this.postData(data);

    }

    postData(data) {
        axios({
            method: 'post',
            url: 'http://localhost:8080/uploadFile',
            data: data
        })
            .then(response => {
                this.displayWarning("Plik został dodany", "#44DE28");
            })
            .catch(error => {
                this.displayWarning(error.response.data.message, "red");
            });
    }

    render() {
        return (<div>
            <Header/>
            <div className="uploadFileBox">
                <div className="uploadFileTextBox">
                    <p>Dodawanie pliku</p>
                </div>
                <div className="uploadFileDrop">
                    <ReactDropzone className="dropzone"
                                   multiple={false}
                                   onDrop={this.onDrop}
                    >
                        <span>Upuść plik</span>
                    </ReactDropzone>
                </div>
                <aside>
                    <span>Dodany plik :</span>
                    <div className="fileName">{this.state.file.name ? this.state.file.name : ''}</div>
                </aside>
                <Button
                    block
                    bsSize="large"
                    bsStyle="info"
                    type="submit"
                    onClick={this.handleSubmit}
                >
                    Zatwierdź
                </Button>
            </div>

            <div className="warning-upload-file" style={this.state.disabledWarning}>{this.state.warning}</div>
        </div>);
    }
}
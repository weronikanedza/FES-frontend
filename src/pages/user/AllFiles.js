import React, {Component} from "react";
import "../../styles/user/AllFiles.css"
import axios from "axios";
import Modal from 'react-modal';
import File from "./File";
import {  modalStyle} from "../../styles/modalStyle";
import {Button, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";

export default class AllFiles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            shareModalIsOpen: false,
            deleteModalIsOpen: false,
            detailsModalIsOpen: false,
            currentFile: '',
            email:'',
            errorMessage:'',
            helpColor: 'green'
        };

        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.openShareModal = this.openShareModal.bind(this);
        this.openDetailsModal = this.openDetailsModal.bind(this);

        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.closeShareModal = this.closeShareModal.bind(this);
        this.closeDetailsModal = this.closeDetailsModal.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.deleteFile = this.deleteFile.bind(this);
        this.shareFile = this.shareFile.bind(this);
    }

    componentWillMount() {
        const filesType=localStorage.getItem('filesType');
        let postUrl='';

        switch (filesType){
            case 'ALL' : postUrl = "getAllFiles";
            break;
            case 'USER': postUrl = 'getAllFilesAddedByUser';
            break;
            case 'SHARED': postUrl = 'getAllSharedFiles';
        }

        this.postData(localStorage.getItem('id'), postUrl);
    }

    postData(data, path) {
        axios({
            method: 'post',
            url: 'http://localhost:8080/' + path,
            data: data,
            config: {headers: {'Content-Type': 'application/json'}}
        })
            .then(response => {
                this.setState({files: response.data})
            })
            .catch(error => {
                //      this.displayWarning(error.response.data.message, "red");
            });
    };

    download = (index) => {
        this.postDataFile(this.state.files[index]['id']);
    };

    postDataFile(data) {
        axios({
            method: 'post',
            url: 'http://localhost:8080/downloadFile',
            data: data,
            responseType: 'blob'
        })
            .then(response => {
                const filename = response.headers['content-disposition'].split('filename=')[1];
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                //      this.displayWarning(error.response.data.message, "red");
            });
    }


    openDeleteModal(index) {
        this.setState({
            deleteModalIsOpen: true,
            currentFile: this.state.files[index]
        });
    }

    openShareModal(index) {
        this.setState({shareModalIsOpen: true,
            currentFile: this.state.files[index]});
    }

    openDetailsModal() {
        this.setState({detailsModalIsOpen: true});
    }



    closeDeleteModal() {
        this.setState({deleteModalIsOpen: false});
    }

    closeShareModal() {
        this.setState({shareModalIsOpen: false,
                        errorMessage:'',
                        email: ''
                        });
    }

    closeDetailsModal() {
        this.setState({detailsModalIsOpen: false});
    }

    deleteFile() {
        let data = new FormData();
        data.set('fileId',this.state.currentFile.id);
        data.set('userId',localStorage.getItem('id'));

        this.closeDeleteModal();
        axios({
            method: 'post',
            url: 'http://localhost:8080/deleteFile',
            data: data
        })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
               alert('Spróbuj ponownie');
            });
    }

    shareFile (event) {
     //   this.closeShareModal();
        event.preventDefault();
        let data = new FormData();

        data.append('id',this.state.currentFile.id);
        data.append('email', this.state.email);

        axios({
            method: 'post',
            url: 'http://localhost:8080/shareFile',
            data: data
        })
            .then(response => {
                this.setState({
                    errorMessage: 'Plik został udostępniony',
                    helpColor: 'green'
                })
            })
            .catch(error => {
                this.setState({
                    errorMessage: error.response.data.message,
                    helpColor: 'red'
                })
            });
    }

    handleChange(e) {
        this.setState({ email: e.target.value });
    }

    renderButtons = (button1Value,button2Value,function1,function2) => {
        return(
            <div className="delete-modal-box-buttons">
                <Button
                    block
                    bsSize="large"
                    style={{
                        padding: '10px',
                        margin: '10px'
                    }
                    }
                    bsStyle="warning"
                    className="delete-modal-box-button"
                    onClick={function1}
                >
                    {button1Value}
                </Button>
                <Button
                    block
                    bsSize="large"
                    style={{
                        padding: '10px',
                        margin: '10px'
                    }
                    }
                    bsStyle="info"
                    type="submit"
                    onClick={function2}
                >
                    {button2Value}
                </Button>
            </div>
        )
    };

    render() {
        return (
            <div className="allFiles">
            {this.state.files.map((file, index) => {
                return (
                    <File
                        key={index}
                        id={file.id}
                        fileName={file.fileName}
                        fileType={file.fileType}
                        filePath={file.filePath}
                        download={this.download.bind(this, index)}
                        openDeleteModal={this.openDeleteModal.bind(this, index)}
                        openShareModal={this.openShareModal.bind(this, index)}
                        openDetailsModal={this.openDetailsModal.bind(this, index)}
                    />
                )
            })}

            <Modal
                isOpen={this.state.deleteModalIsOpen}
                style={modalStyle}
            >
                <div className="deleteModalContent">
                    Jesteś pewien że chcesz usunąć plik ?
                </div>
                {this.renderButtons('NIE','TAK',this.closeDeleteModal,this.deleteFile)}

            </Modal>

            <Modal
            isOpen={this.state.shareModalIsOpen}
            style={modalStyle}
            >
                <form>
                        <ControlLabel className="share-modal-label">Podaj email użytkownika któremu chcesz udostępnić plik</ControlLabel>
                        <FormControl
                            className={"modal-email-share"}
                            type="email"
                            value={this.state.email}
                            placeholder="Email"
                            onChange={this.handleChange}
                            required
                        />
                        <FormControl.Feedback />
                    <div style={{clear: 'both'}}/>
                        <span className="help-modal" style={{ display : this.state.errorMessage ? 'block' : 'none'}}>
                        <HelpBlock style={{color:this.state.helpColor}}>{this.state.errorMessage}</HelpBlock>
                        </span>
                    {this.renderButtons('ZAMKNIJ','UDOSTĘPNIJ',this.closeShareModal,this.shareFile)}
                </form>

            </Modal>

        </div>
        );
    }
}
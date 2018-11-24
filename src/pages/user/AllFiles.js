import React, {Component} from "react";
import "../../styles/user/AllFiles.css"
import axios from "axios";
import Modal from 'react-modal';
import File from "./File";
import {deleteModalStyle, customStyles, buttonStyle} from "../../styles/modalStyle";
import {Button} from "react-bootstrap";

export default class AllFiles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            shareModalIsOpen: false,
            deleteModalIsOpen: false,
            detailsModalIsOpen: false,
            currentFile: ''
        };

        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.openShareModal = this.openShareModal.bind(this);
        this.openDetailsModal = this.openDetailsModal.bind(this);

        this.closeDeleteModal = this.closeDeleteModal.bind(this);
        this.closeShareModal = this.closeShareModal.bind(this);
        this.closeDetailsModal = this.closeDetailsModal.bind(this);

        this.deleteFile = this.deleteFile.bind(this);

        this.afterOpenModal = this.afterOpenModal.bind(this);
    }

    componentWillMount() {
        this.postData(localStorage.getItem('id'), 'getAllFiles');
    }

    postData(data, path) {
        axios({
            method: 'post',
            url: 'http://localhost:8080/' + path,
            data: data,
            config: {headers: {'Content-Type': 'application/json'}}
        })
            .then(response => {
                console.log(response.data)
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

    openShareModal() {
        this.setState({shareModalIsOpen: true});
    }

    openDetailsModal() {
        this.setState({detailsModalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeDeleteModal() {
        this.setState({deleteModalIsOpen: false});
    }

    closeShareModal() {
        this.setState({shareModalIsOpen: false});
    }

    closeDetailsModal() {
        this.setState({detailsModalIsOpen: false});
    }

    deleteFile() {
        this.closeDeleteModal();
        axios({
            method: 'post',
            url: 'http://localhost:8080/deleteFile',
            data: this.state.currentFile.id
        })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
               alert('Spróbuj ponownie');
            });
    }

    render() {
        return (<div className="allFiles">
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
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeDeleteModal}
                style={deleteModalStyle}
                contentLabel="Example Modal"
            >
                <div className="deleteModalContent">
                    Jesteś pewien że chcesz usunąć plik ?
                </div>
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
                        onClick={this.closeDeleteModal}
                    >
                        NIE
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
                        onClick={this.deleteFile}
                    >
                        TAK
                    </Button>
                </div>

            </Modal>

            {/*<Modal*/}
            {/*isOpen={this.state.shareModalIsOpen}*/}
            {/*onAfterOpen={this.afterOpenModal}*/}
            {/*onRequestClose={this.closeDeleteModal}*/}
            {/*style={deleteModalStyle}*/}
            {/*contentLabel="Example Modal"*/}
            {/*>*/}

            {/*<h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>*/}
            {/*<button onClick={this.closeDeleteModal}>close</button>*/}
            {/*<div>I am a modal</div>*/}
            {/*<form>*/}
            {/*<input/>*/}
            {/*<button>tab navigation</button>*/}
            {/*<button>stays</button>*/}
            {/*<button>inside</button>*/}
            {/*<button>the modal</button>*/}
            {/*</form>*/}
            {/*</Modal>*/}

        </div>);
    }
}
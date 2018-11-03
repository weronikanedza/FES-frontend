import React, {Component} from "react";
import "../../styles/user/AllFiles.css"
import axios from "axios";
import File from './File';


export default class AllFiles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        }
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
               this.setState({files:response.data})
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
                const filename =  response.headers['content-disposition'].split('filename=')[1];
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
                    />
                )
            })}
        </div>);
    }
}
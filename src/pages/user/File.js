import React, {Component} from 'react';
import JpgImage from "../../images//jpg.png";
import PngImage from "../../images//png.png";
import DocxImage from "../../images//docx.png";
import PdfImage from "../../images//pdf.png";
import "../../styles/user/AllFiles.css"
import axios from "axios";

export default class File extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imagePath: ''
        };
        this.getImage = this.getImage.bind(this);
    }

    componentWillMount() {
        this.getImage();
    }

    getImage() {
        console.log('image : ' + this.props.fileType)
        let fileType = '';
        switch (this.props.fileType) {
            case 'pdf' :
                fileType = PdfImage;
                break;
            case 'docx' :
                fileType = DocxImage;
                break;
            case 'png' :
                fileType = PngImage;
                break;
            case 'jpg' :
                fileType = JpgImage;
                break;
            default :
                fileType = PdfImage;
        }
        this.setState({imagePath: fileType})

    }

    render() {
        return (
            <div className="fileBox">
                <a href='#' onClick={this.props.download}>
                    <img src={this.state.imagePath}/>
                    <br/>
                    {this.props.fileName}
                    <br/>
                </a>
            </div>
        )
    }

}
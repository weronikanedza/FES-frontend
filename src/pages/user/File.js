import React, {Component} from 'react';
import JpgImage from "../../images//jpg.png";
import PngImage from "../../images//png.png";
import DocxImage from "../../images//docx.png";
import PdfImage from "../../images//pdf.png";
import "../../styles/user/AllFiles.css";
import "../../styles/user/ContextMenu.css";
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";


export default class File extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imagePath: ''
        };
        this.getImage = this.getImage.bind(this);

    }


    componentWillMount() {
        this.setState({
                isComponent: true
            }
        );
        this.getImage();
    }

    getImage() {
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


    handleClick = (e, data) => {
        console.log(e, data);
    };



    render() {
        return (
            <div className="fileBox">
                <ContextMenuTrigger id={this.props.id + ""}>
                    <a href='#' onClick={this.props.download}>
                        <img src={this.state.imagePath}/>
                        <div className="fileBox-label" >
                        {this.props.fileName}
                        </div>
                    </a>
                </ContextMenuTrigger>

                <ContextMenu id={this.props.id + ""}>
                    <MenuItem data={{data: this.props.id}} onClick={this.props.openDetailsModal}>
                       Szczegóły o pliku
                    </MenuItem>
                    <MenuItem data={{foo: this.props.id}} onClick={this.props.openShareModal}>
                        Udostępnij plik
                    </MenuItem>
                    <MenuItem divider/>
                    <MenuItem data={{foo: this.props.id}} onClick={this.props.openDeleteModal}>
                        Usuń
                    </MenuItem>
                </ContextMenu>
            </div>
        )
    }

}
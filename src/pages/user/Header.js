import React, {Component} from "react";
import {Redirect} from 'react-router-dom'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';


export default class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.signOut = this.signOut.bind(this);

        const fullName = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');

        this.state = {
            isOpen: false,
            name: fullName,
            redirect: ''
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    setRedirect = () => {
        this.setState({
            redirect: 'uploadFile'
        })
    };

    setAllFilesRedirect = () => {
        localStorage.setItem('filesType', 'ALL');
        this.setMainRedirect();
        window.location.reload();
    };

    setUserFilesRedirect = () => {
        localStorage.setItem('filesType', 'USER');
        this.setMainRedirect();
        window.location.reload();
    };

    setSharedFilesRedirect = () => {
        localStorage.setItem('filesType', 'SHARED');
        this.setMainRedirect();
        window.location.reload();
    };

    setEditDataRedirect = () => {
        this.setState({
            redirect: 'editData'
        })
    };

    setChangePasswordRedirect = () => {
        this.setState({
            redirect: 'changePassword'
        })
    };

    setMainRedirect = () => {
        this.setState({
            redirect: 'user'
        })
    };

    renderRedirect = () => {
        switch (this.state.redirect) {
            case 'uploadFile':
                return <Redirect to='/user/uploadFile'/>;
                break;
            case 'user':
                return <Redirect to='/user'/>;
                break;
            case 'editData':
                return <Redirect to='/editData'/>;
                break;
            case 'changePassword':
                return <Redirect to='/changePassword'/>;
                break;
            default:
                break;
        }
    };

    signOut() {
        localStorage.clear();
        window.location = "/login";
    }


    render() {
        return (
            <div>
                {this.renderRedirect()}
                <Navbar className="navbar" light expand="md">
                    <NavbarBrand>{this.state.name}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink onClick={this.setAllFilesRedirect}>Strona główna</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Moje konto
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem  onClick={this.setEditDataRedirect}>
                                        Edytuj dane
                                    </DropdownItem>
                                    <DropdownItem onClick={this.setChangePasswordRedirect}>
                                        Zmień hasło
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Menu
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={this.setUserFilesRedirect}>
                                        Moje pliki
                                    </DropdownItem>
                                    <DropdownItem onClick={this.setSharedFilesRedirect}>
                                        Udostępnione mi pliki
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem onClick={this.setRedirect}>
                                        Dodaj plik
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink onClick={this.signOut}>Wyloguj się</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
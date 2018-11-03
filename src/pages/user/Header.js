import React, { Component } from "react";
import { Redirect } from 'react-router-dom'

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
        DropdownItem } from 'reactstrap';


export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.addFileRedirect=this.addFileRedirect.bind(this);
        this.signOut=this.signOut.bind(this);

        const fullName = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');

        this.state = {
            isOpen: false,
            name: fullName,
            redirect: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/user/uploadFile'/>
        }
    };

    signOut(){
        localStorage.clear();
        window.location="/login";
    }

    addFileRedirect(){
        this.props.history.push('/uploadFile');
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <Navbar color="light" light expand="md">
                    <NavbarBrand >{this.state.name}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/user">Strona główna</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Moje konto
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Edytuj dane
                                    </DropdownItem>
                                    <DropdownItem>
                                        Zmień hasło
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Menu
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={this.function}>
                                        Moje pliki
                                    </DropdownItem>
                                    <DropdownItem>
                                        Udostępnione pliki
                                    </DropdownItem>
                                    <DropdownItem divider />
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
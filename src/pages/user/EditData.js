import {Component} from "react";
import React from "react";
import Header from "./Header";
import {Button, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import Select from 'react-select'
import moment from "moment";
import axios from "axios";
import "../../styles/user/EditData.css";
import countryList from 'react-select-country-list'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {getCountries} from "../../helper/helperFunctions";

export default class EditData extends Component {
    constructor(props) {
        super(props);

        this.options = getCountries();

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            dateOfBirth: "",
            city: "",
            warning: "",
            startDate: moment(),
            options: this.options,
            country: null,
            disabledWarning: {display: "none", marginTop: '10px'},
            isMounted: false
        };

        this.validateForm = this.validateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.validateDate = this.validateDate.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.validate = this.validate.bind(this);
        this.displayErrorMessage = this.displayErrorMessage.bind(this);
    }

    componentWillMount(){
            axios({
                method: 'post',
                url: 'http://localhost:8080/getUser',
                data: localStorage.getItem('id'),
            })
                .then(response => {
                    this.setUserData(response.data)
                })
                .catch(() => {
                    alert('Spróbuj ponownie')
                });
    }

    setUserData = (data) => {
        this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            dateOfBirth: moment(data.date),
            city: data.city,
            country : data.country
        })
    };

    postRequest() {
        const user = {
            id: localStorage.getItem('id'),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            date: moment(this.state.dateOfBirth).format('MM/DD/YYYY'),
            city: this.state.city,
            country: this.state.country
        };

        axios({
            method: 'post',
            url: 'http://localhost:8080/editUser',
            data: user,
            config: {headers: {'Content-Type': 'application/json'}}
        })
            .then((response) => {
                this.displayMessage("Dane zostały zmienione.")
            })
            .catch(error => {
                this.displayErrorMessage(error.response.data)
            });

    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleChangeDate(date) {
        this.setState({
            startDate: date,
            dateOfBirth: moment(date).format('DD-MM-YYYY')
        });
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        });
    }

    handleChangeCountry(country) {
        if (this.state.isMounted) {
            this.setState({
                country: country.label
            });
        }
    }

    handleSubmit = event => {
        //  if (this.validateForm())
        this.postRequest();
        event.preventDefault();
    };

    validateForm() {
        return this.validateDate();

    }

    validateDate() {
        return this.validateFormat();
    }

    validateFormat() {
        const selectedDate = this.state.dateOfBirth;
        const message = "Date format incorrect";
        return this.validate(selectedDate && moment(selectedDate, 'DD-MM-YYYY', true).isValid(), message)
    }

    validate(condition, message) {
        if (condition) {
            return true;
        } else {
            this.setState({
                warning: message,
                disabledWarning: {display: "block"}
            });
            return false;
        }
    }


    displayErrorMessage(response) {
        this.setState({
            warning: response,
            disabledWarning: {display: "block",color:'red',marginTop: '30px' , width: '800px'}
        });
    }

    displayMessage(response) {
        this.setState({
            warning: response,
            disabledWarning: {display: "block",color:'green',marginTop: '30px', width: '800px'}
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="editDataForm">
                    <div className="password-text-box">
                        Edycja danych
                    </div>
                    <form className="edit-data-form-box">
                        <div className="groupPair">
                            <FormGroup className="inputStyle" controlId="firstName" bsSize="large">
                                <ControlLabel>Imię</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup className="inputStyle"  controlId="lastName" bsSize="large">
                                <ControlLabel>Nazwisko</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                        </div>
                        <div className="groupPair">
                            <FormGroup className="inputStyle"  controlId="email" bsSize="large">
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup  className="inputStyle" controlId="dateOfBirth" bsSize="large">
                                <ControlLabel>Data urodzenia</ControlLabel>
                                <DatePicker
                                    selected={this.state.dateOfBirth}
                                    onChange={this.handleChangeDate}
                                    className="inputDate"
                                    required
                                />
                            </FormGroup>
                        </div>
                        <div className="groupPair">
                            <FormGroup className="inputStyle"  controlId="city" bsSize="large">
                                <ControlLabel>Miasto</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.city}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormGroup>

                            <FormGroup className="inputStyle"  controlId="Country" bsSize="large">
                                <ControlLabel>Kraj</ControlLabel>
                                <Select required="required"
                                        options={this.state.options}
                                        placeholder={this.state.country}
                                        value={this.state.country}
                                        className="inputSelect"
                                        onChange={this.handleChangeCountry}

                                />
                            </FormGroup>

                        </div>
                        <Button
                            block
                            style={{
                                padding: '10px',
                                margin: '10px',
                                width:'730px'
                            }
                            }
                            bsSize="large"
                            bsStyle="info"
                            type="submit"
                            onClick={this.handleSubmit}
                        >
                            Edytuj dane
                        </Button>


                    </form>
                </div>
                <div className="space"></div>
                <div className="warning" style={this.state.disabledWarning}>
                    {this.state.warning}
                </div>
            </div>);
    }
}
 import axios from "axios";

export function postAxios(context,data,url,handleResponse,handleError) {

    axios({
        method: 'post',
        url: `http://localhost:8080/${url}`,
        data: data,
        config: {headers: {'Content-Type': 'application/json'}}
    })
        .then( () => {
          handleResponse();
        })
        .catch(error => {
            handleError(error.response.data.message);
        });
}


export function displayMessage(context, message,color) {
    context.setState({
        message: message,
        messageDisplay: {display: "block",color:color},
        fontWeight: 'bold'
    });
}

export function validatePasswordsEquality(context, p1, p2) {
    if (p1 === p2) {
        return true;
    }

    const message = 'Hasła są różne';
    displayMessage(context, message,'red');
    return false;
}

export function validatePasswordStrength(context, password) {
    if (password.match("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$")) {
        return true;
    }

    const message = 'Hasło powinno zawierać min. 8 znaków, małą i dużą literę oraz liczbę';
    displayMessage(context, message,'red');
    return false;
}

export function signout(){
    localStorage.clear();
    window.location = "/login";
}

export function getCountries(){
    return [
        {value:"AF",label:"Afganistan"},
        {value:"AL",label:"Albania"},
        {value:"DZ",label:"Algeria"},
        {value:"AO",label:"Angola"},
        {value:"AM",label:"Armenia"},
        {value:"AU",label:"Afganistan"},
        {value:"AQ",label:"Antarktyda"},
        {value:"AU",label:"Austria"},
        {value:"BD",label:"Bangladesz"},
        {value:"BE",label:"Belgia"},
        {value:"BY",label:"Białoruś"},
        {value:"BO",label:"Boliwia"},
        {value:"BW",label:"Botswana"},
        {value:"BR",label:"Brazylia"},
        {value:"BG",label:"Bułgaria"},
        {value:"CN",label:"Chiny"},
        {value:"HR",label:"Chorwacja"},
        {value:"CY",label:"Cypr"},
        {value:"DK",label:"Dania"},
        {value:"DM",label:"Dominika"},
        {value:"EG",label:"Egipt"},
        {value:"ES",label:"Estonia"},
        {value:"FI",label:"Finlandia"},
        {value:"FR",label:"Francja"},
        {value:"GR",label:"Grecja"},
        {value:"GL",label:"Grenlandia"},
        {value:"GE",label:"Gruzja"},
        {value:"GT",label:"Gwatemala"},
        {value:"HT",label:"Haiti"},
        {value:"ES",label:"Hiszpania"},
        {value:"HK",label:"Hongkong"},
        {value:"IN",label:"Indie"},
        {value:"ID",label:"Indonezja"},
        {value:"IE",label:"Irlandia"},
        {value:"JP",label:"Japonia"},
        {value:"CA",label:"Kanada"},
        {value:"CO",label:"Kolumbia"},
        {value:"CU",label:"Kuba"},
        {value:"LB",label:"Liban"},
        {value:"LT",label:"Litwa"},
        {value:"LU",label:"Luksemburg"},
        {value:"LV",label:"Łotwa"},
        {value:"MG",label:"Madagaskar"},
        {value:"MY",label:"Malezja"},
        {value:"MT",label:"Malta"},
        {value:"DE",label:"Niemcy"},
        {value:"PW",label:"Palau"},
        {value:"PL",label:"Polska"},
        {value:"RU",label:"Rosja"},
        {value:"RO",label:"Rumunia"},
        {value:"SK",label:"Słowacja"},
        {value:"SI",label:"Słowenia"},
        {value:"US",label:"Stany Zjedn. Ameryki"},
        {value:"SD",label:"Sudan"},
        {value:"TR",label:"Turcja"},
        {value:"TV",label:"Tuvalu"},
        {value:"UA",label:"Ukraina"},
        {value:"UY",label:"Urugwaj"},
        {value:"VA",label:"Watykan"},
        {value:"ZM",label:"Zambia"},
        {value:"ZW",label:"Zimbabwe"}
    ]
}
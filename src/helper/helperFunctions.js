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

    const message = 'Twoje hasło powinno zawierać co najmniej jedną większą literę, jedną mniejszą literę, cyfrę oraz posiadać 8 znaków';
    displayMessage(context, message,'red');
    return false;
}

export function signout(){
    localStorage.clear();
    window.location = "/login";
}
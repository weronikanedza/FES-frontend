// import axios from "axios";
//
// export function sendFile() {
//     axios({
//         method: 'post',
//         url: 'http://localhost:8080/login',
//         data: loginData,
//         config: {headers: {'Content-Type': 'application/json'}}
//     })
//         .then(response => {
//           handleResponse()
//         })
//
//         .catch(error => {
//             displayErrorMessage(error.response);
//         });
// }
//
// export function handleResponse() {
//
// }
//
export function displayErrorMessage(response) {
    this.setState({
        warning: response.data.message,
        disabledWarning: {display: "block"}
    });
}

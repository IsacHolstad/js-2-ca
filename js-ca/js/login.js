import {USER_LOGIN_URL} from "./settings/api.js";
import {validateEmail} from "./utils/validation.js";
import {saveUser, saveToken} from "./utils/storage.js";

const logInForm = document.querySelector("#login-form");
console.log(logInForm);

//TODO validate login data
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const emailErrorNotValid = document.querySelector("#emailErrorNotValid");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

const generalErrorMessage = document.querySelector("#general-error-message");

if (logInForm) {
    logInForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let isEmail = false;
        if (email.value.trim().length > 0) {
            emailError.classList.add("hidden");
            isEmail = true;
        }else {
            emailError.classList.remove("hidden")
        }
        let isValidEmail = false;
        if (email.value.trim().length && validateEmail(email.value) === true){
            emailErrorNotValid.classList.add("hidden");
            isValidEmail = true;
        }else if (email.value.trim().length && validateEmail(email.value) !== true){
            emailErrorNotValid.classList.remove("hidden")
        }
        let isPassword = false;
        if (password.value.trim().length >= 8) {
            passwordError.classList.add("hidden")
            isPassword = true;
        }else{
            passwordError.classList.remove("hidden")
        }


        let isFormValid = isEmail && isValidEmail && isPassword;
        if (isFormValid) {
            console.log("SUCCESS");
            const userData = {
                "email" : email.value,
                "password": password.value
            }
            const LOGIN_USER_URL_ENDPOINT = `${USER_LOGIN_URL}`;
            (async function logInUser() {
                const response = await fetch(LOGIN_USER_URL_ENDPOINT,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application(json"
                    },
                    body: JSON.stringify(userData)
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    console.log(data.accessToken)
                    saveToken(data.accessToken)
                    const userToSave = {
                        name: data.name,
                        email: data.email
                    }
                    console.log(userToSave);
                    saveUser(userToSave);
                    console.log("POST ReQUEST LOGIN SUCCEDED")
                    location.href = "/welcome.html"
                } else {
                    const err = await response.json();
                    const message = `${err.message}`;
                    console.log("post request failed")
                    throw new Error(message);
                }
            })().catch(err => {
                generalErrorMessage.innerHTML = `There is an error happening ${err.message}`
            });
        } else {
            console.log("validation failed ")
        }
    });
}

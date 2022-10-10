import {USER_LOGIN_URL} from "./settings/api.js";
import {validateEmail} from "./utils/validation.js";
import {saveUser, saveToken} from "./utils/storage.js";

const logInForm = document.querySelector("#login-form");
console.log(logInForm);

//TODO validate login data
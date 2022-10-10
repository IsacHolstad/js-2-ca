import {USER_SIGNUP_URL} from "./settings/api.js";
import {validatePassword} from "./utils/validation.js";
import {validateEmail} from "./utils/validation.js";

const contactForm = document.querySelector("#signup-form");

const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError")

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const emailErrorNotValid = document.querySelector("#emailErrorNotValid");

const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

const confirmPassword = document.querySelector("#confirm_password");
const confirmPasswordError = document.querySelector("#confirmPasswordError");



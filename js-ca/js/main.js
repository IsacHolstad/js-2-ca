import '../style.css'
import {clearStorage} from "./utils/storage.js";
import creatNavigation from "./components/createNavigation.js"

creatNavigation();

const logOutbtn = document.querySelector("#logout-button");

if (logOutbtn) {
 logOutbtn.addEventListener("click", function () {
  clearStorage();
  window.location.replace("/login.html")
 })
}
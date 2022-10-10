import moment from "moment";

import {GET_POSTS_URL} from "./settings/api.js";
import {getToken} from "./utils/storage.js";
const postContainer = document.querySelector("#posts-container");
const postNotificationMessage = document.querySelector(".posts__notification");
const accessToken = getToken();
console.log(accessToken);
console.log(GET_POSTS_URL);

if (!accessToken){
    location.href ="/login.html"
}
(async function getPosts() {
    const response = await fetch(GET_POSTS_URL, {
        method: "GET",
        headers: {
            "Content_Type": "application/json",
            "Authorization" : `Bearer ${accessToken}`
        }
    })
    console.log(response)
    if (response.ok) {}
})()
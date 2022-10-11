import moment from "moment";
import {GET_USER_POSTS_URL, DELETE_USER_POST_BY_ID} from "./settings/api"
import {getToken} from "./utils/storage";

let now = moment(new Date());
const accessToken = getToken();

const postsContainer = document.querySelector("#posts-container");
const postsNotificationMessage = document.querySelector(".posts__notification");

async function getMyPosts() {
    const response = await fetch(GET_USER_POSTS_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if (response.ok) {
        const jsonResponse = await response.join();
        console.log("got my post in log");
        postsContainer.innerHTML = "";
        const {posts} = jsonResponse;
        if (!posts.length) {
            postsNotificationMessage.innerHTML = "Your Feed Is Empty";
        } else {
            const numberOfPosts = posts.length;
            for (let i = 0; i < numberOfPosts; i++) {
                const {created} = posts[i];
                console.log(posts[i])
                const minutesSinceCreated = now.diff(created, "minutes");
                postsContainer.innerHTML += `
                
                `
            }
        }
    }
}

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
    if (response.ok) {
        const posts = await response.json();
        console.log(posts);
        console.log("everything working so far!");
        let now = moment(new Date());
        console.log("posts: ", posts)
        if (!posts.length) {
            postNotificationMessage.innerHTML = `Sorry, Feed Is Empty`;
        } else {
            const listOfPosts = posts.map((post) =>{
                console.log("indivudal posts: ", post);
                const postBody = post.body;
                const postTitle = post.title;
                const postDate = post.created;
                const minutesSinceCreated = now.diff(postDate, 'minutes');

                return(`
                //TODO add posts container html design and add data variables
                `)
            })
        }
    }
})();
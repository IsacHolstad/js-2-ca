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


                return (`
                <li class="relative px-8 py-5 bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-50">
               
                    <div class="flex justify-between space-x-8">
                        <div class="flex-1 min-w-0">
                            <a href="/single-post.html?post_id=${post.id}" class="block focus:outline-none ">
                                <span class="absolute inset-0" aria-hidden="true"></span>
                                <p class="text-sm font-medium text-gray-900 truncate capitalize">${postTitle}</p>
                            </a>
                        </div>
                        <time datetime="2021-01-27T16:35" class="flex-shrink-0 text-sm text-gray-400 whitespace-nowrap">${minutesSinceCreated} m
                            ago
                        </time>
                    </div>
                    <div class="mt-1">
                        <p class="text-sm text-gray-400 line-clamp-2">${postBody}</p>
                    </div>
                </li>`)

            }).join('')
            postContainer.insertAdjacentHTML('beforeend', listOfPosts);
        }

    } else {
        const err = await response.json();
        const message = `Error Happening ${err}`
        throw new Error(message)
    }
})().catch(err =>{
    postNotificationMessage.innerHTML = err
})
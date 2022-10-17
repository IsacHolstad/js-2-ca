import moment from "moment";

import {GET_POSTS_URL} from "./settings/api.js";
import {getToken} from "./utils/storage.js";

const searchBar = document.getElementById('postSearch')
const postContainer = document.querySelector("#posts-container");
const postNotificationMessage = document.querySelector(".posts__notification");
const accessToken = getToken();


if (!accessToken) {
    location.href = "/login.html"
}
(async function getPosts() {
    const response = await fetch(GET_POSTS_URL, {
        method: "GET",
        headers: {
            "Content_Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if (response.ok) {
        const posts = await response.json();
        let now = moment(new Date());
        if (!posts.length) {
            postNotificationMessage.innerHTML = `Sorry, Feed Is Empty`;
        } else {
            const listOfPosts = posts.map((post) => {
                const postBody = post.body;
                const postTitle = post.title;
                const postDate = post.created;
                const minutesSinceCreated = now.diff(postDate, 'minutes');
                return (`
                <a href="./single-post.html?post_id=${post.id}">
                 <div class=" flex items-center justify-center  container drop-shadow-md py-2 filterAtribute">
                    <div class="px-5 py-4 bg-white dark:bg-gray-800 shadow rounded-xl container ">
                    <div class="flex mb-4">
                      <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="some randome women"/>
                      <div class="ml-2 mt-0.5">
                         <span class="block font-medium text-base leading-snug text-black dark:text-gray-100" id="postTitle-filter">${postTitle}</span>
                      </div>
                    </div>
                    <p class="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal text-sm text-center">${postBody}</p>
                    <div class="flex justify-between items-center mt-5">
                    <div class="flex ">
                      <span class="ml-4 text-white font-light flex ">
                      </span>
                    </div>  
                    <div class="ml-1 text-gray-500 dark:text-gray-400 font-light">${minutesSinceCreated} m ago</div>
                    </div>
                  </div>
                </div>
             </a>

                `)

            }).join('')
            postContainer.insertAdjacentHTML('beforeend', listOfPosts);
        }

    } else {
        const err = await response.json();
        const message = `Error Happening ${err}`
        throw new Error(message)
    }
})().catch(err => {
    postNotificationMessage.innerHTML = err
});









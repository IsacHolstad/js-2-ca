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
        const jsonResponse = await response.json();
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
                console.log(posts[i].title)
                const minutesSinceCreated = now.diff(created, "minutes");
                postsContainer.innerHTML += `
                <div class=" w-full  flex flex-col justify-center items-center p-4">
                  <div class="bg-gray-800 text-white w-full max-w-md flex flex-col rounded-xl shadow-lg p-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-4">
                        <div class="rounded-full w-4 h-4 border border-purple-500"></div>
                        <div class="text-md font-bold">${posts[i].title}</div>
                            
                      </div>
                      
                      <div class="flex items-center space-x-4">
                        <div class="cursor-pointer">
                                                <div>${posts[i].body}</div>

                          <img class="w-5 h-5 rounded-lg" src="https://i.pravatar.cc/300" />
                        </div>
                        <div class="text-gray-500 hover:text-gray-300 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </div>
                        <div class="text-gray-500 hover:text-gray-300 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <time class="mt-4 text-gray-500 font-bold text-sm">
                      ${minutesSinceCreated} m ago
                    </time>
                  </div>
                </div>
                
                `
            }
        }
    }
}
getMyPosts();

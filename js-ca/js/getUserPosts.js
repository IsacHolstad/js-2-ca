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
                <div class=" flex items-center justify-center  container drop-shadow-md py-2 ">
                  <div class="px-5 py-4 bg-white dark:bg-gray-800 shadow rounded-lg container ">
                    <div class="flex mb-4">
                      <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"/>
                      <div class="ml-2 mt-0.5">
                        <span class="block font-medium text-base leading-snug text-black dark:text-gray-100">${posts[i].title}</span>
                      </div>
                    </div>
                    <p class="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal">${posts[i].body}</p>
                    <div class="flex justify-between items-center mt-5">
                    <div class="flex ">
                      <svg class="p-0.5 h-6 w-6 rounded-full z-20 bg-white dark:bg-gray-800 " xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'><defs><linearGradient id='a1' x1='50%' x2='50%' y1='0%' y2='100%'><stop offset='0%' stop-color='#18AFFF'/><stop offset='100%' stop-color='#0062DF'/></linearGradient><filter id='c1' width='118.8%' height='118.8%' x='-9.4%' y='-9.4%' filterUnits='objectBoundingBox'><feGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/><feOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/><feComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/><feColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/></filter><path id='b1' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/></defs><g fill='none'><use fill='url(#a1)' xlink:href='#b1'/><use fill='black' filter='url(#c1)' xlink:href='#b1'/><path fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/></g></svg>
                      <span class="ml-1 text-gray-500 dark:text-gray-400  font-light">8</span>
                    </div>  
                    <div class="ml-1 text-gray-500 dark:text-gray-400 font-light">${minutesSinceCreated} m ago</div>
                    </div>
                  </div>
                </div>
               
                     
                
                `
            }
        }
    }
}
getMyPosts();

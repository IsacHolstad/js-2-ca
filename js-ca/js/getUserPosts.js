import moment from "moment";
import {GET_USER_POSTS_URL, DELETE_USER_POST_BY_ID} from "./settings/api"
import {getToken} from "./utils/storage";

let now = moment(new Date());
const accessToken = getToken();

const postsContainer = document.querySelector("#posts-container");
const postsNotificationMessage = document.querySelector(".posts__notification");

async function getUserPosts() {
    const response = await fetch(GET_USER_POSTS_URL, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if (response.ok) {
        const jsonResponse = await response.json();
        postsContainer.innerHTML = "";
        const {posts} = jsonResponse;
        if (!posts.length) {
            postsNotificationMessage.innerHTML = `<h3 class="text-red-300 text-center">You don't have any posts</h3>
                <a href="./creat-post.html" class=" animate-bounce bg-blue-600 block text-center rounded-xl mx-auto mt-32 text-white text-3xl drop-shadow-xl p-4">Click me to make a post</a>`

        } else {
            const numberOfPosts = posts.length;
            for (let i = 0; i < numberOfPosts; i++) {
                const {created} = posts[i];
                const minutesSinceCreated = now.diff(created, "minutes");
                postsContainer.innerHTML += `
                <div class=" flex items-center justify-center  container drop-shadow-md py-2 ">
                  <div class="px-5 py-4 bg-white dark:bg-gray-800 shadow rounded-xl container ">
                    <div class="flex mb-4">
                      <img class="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="some randome women"/>
                      <div class="ml-2 mt-0.5">
                        <span class="block font-medium text-base leading-snug text-black text-gray-400">${posts[i].title}</span>
                      </div>
                    </div>
                    <p class="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal text-center">${posts[i].body}</p>
                    <div class="flex justify-between items-center mt-5">
                    <div class="flex ">
                      <span class="text-white font-light flex ">
                        <button
                               data-id="${posts[i].id}"
                               type="button"
                               class="delete-post-button items-center bg-red-600 w-16 rounded-xl border-2 border-red-900 "
                        > Delete
                        </button>
                        <a href="/edit-post.html?post_id=${posts[i].id}" class="rounded-xl bg-blue-600 w-14 border-2 ml-3 block text-center border-blue-900">Edit</a>
                      </span>
                    </div>  
                    <div class="ml-1 text-gray-500 dark:text-gray-400 font-light">${minutesSinceCreated} m ago</div>
                    </div>
                  </div>
                </div>`
            }
        }
    } else {
        postsNotificationMessage.innerHTML = await response.json()
    }
}

getUserPosts().then(() => {
    handleDeleteBtnsEvent()
})

function handleDeleteBtnsEvent() {
    let deleteButtons = document.getElementsByClassName('delete-post-button');
    const totalNumbersOfDeleteBtns = deleteButtons.length;
    for (let i = 0; i < totalNumbersOfDeleteBtns; i++) {
        deleteButtons[i].addEventListener('click', function () {
            const postId = this.dataset.id;
            handleDeletePostById(postId);
        });
    }
}

function handleDeletePostById(id) {
    const deleteUserById = async () => {
        try {
            let response = await fetch(`${DELETE_USER_POST_BY_ID}/${id}`, {

                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }

            });
            if (response.status === 200) {
                getUserPosts().then(() => {
                    handleDeleteBtnsEvent()
                });

            } else {
                const err = await response.json()
                const message = `Sorry post could not be deleted ${err}`
                throw Error(message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    deleteUserById().then(r => {
        console.log(r)

    });
}
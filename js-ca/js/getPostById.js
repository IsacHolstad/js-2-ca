import {getToken} from "./utils/storage";
import {GET_POST_BY_ID_URL} from "./settings/api";

const paramString = window.location.search;
console.log(paramString)
const searchParam = new URLSearchParams(paramString)
console.log(searchParam)
const postId = searchParam.get("post_id")
console.log("FIND OUT WHY IT SAYS NULL IN LOG:", postId)
const accessToken = getToken();
console.log("Access Token: ", accessToken)

const postDetailContainer = document.getElementById("post-details");
console.log(postDetailContainer)

console.log(GET_POST_BY_ID_URL)

async function getPostById() {
    const response = await fetch(`${GET_POST_BY_ID_URL}/${postId}`, {
        method : "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${accessToken}`
        }
    })
    console.log(response)
    const data = await response.json()
    console.log(data)
    const {title, body, created, updated, id} = data;
    console.log(data)
    console.log(title)
    console.log(body)
    console.log(created)
    console.log(updated)
    console.log(id)
    postDetailContainer.innerHTML = `
    <dl class="border-2 mx-auto ">
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 capitalize">Title</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${title}</dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 capitalize">Description</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${body}</dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 capitalize">Created</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${created}</dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500 capitalize">Updated</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">${updated}</dd>
        </div>
    
    
    
    
    
    </dl>
    
    
    
    `
}
getPostById();

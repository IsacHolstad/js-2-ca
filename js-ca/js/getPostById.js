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
                <div class=" flex items-center justify-center  container drop-shadow-md py-2">
                  <div class="px-5 py-4 bg-white dark:bg-gray-800 shadow rounded-lg container ">
                    <div class="flex mb-4">
                      <div class="ml-2 mt-0.5">
                        
                         <span class="block font-medium text-base leading-snug text-black dark:text-gray-100 flex"><p class="text-gray-200 px-4">Title:</p> ${title}</span>
                      </div>
                    </div>
                    <p class="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal text-center">${body}</p>
                    <div class="flex justify-between items-center mt-5">
                    <div class="flex ">
                      <span class="ml-4 text-white font-light flex ">
                      </span>
                    </div>  
                    <div class="ml-1 text-gray-500 dark:text-gray-400 font-light">${created}</div>
                    </div>
                  </div>
                </div>
    
    
    
    `
}
getPostById();

import {getToken} from "./utils/storage";
import {EDIT_POST_URL, GET_POST_BY_ID_URL} from "./settings/api";

const accessToken = getToken();
const editPostForm = document.querySelector("#edit-post-form");
const postTitle = document.querySelector("#postTitle");
const postTitleError = document.querySelector("#postTitleError");
const postDescription = document.querySelector("#postDescription");
const postDescriptionError = document.querySelector("#postDescriptionError");

console.log(accessToken)
console.log(editPostForm)
console.log(postTitle)
console.log(postTitleError)
console.log(postDescription)
console.log(postDescriptionError)

const paramString = window.location.search
console.log(paramString);
const searchParam = new URLSearchParams(paramString);
console.log(searchParam);
const postId = searchParam.get("post_id");
console.log("id of this post: ", postId);

async function getPostById() {
    const response = await fetch(`${GET_POST_BY_ID_URL}/${postId}`, {
        method: "GET",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    console.log("response ", response);
    if (response.status === 200){
        const data = await response.json();
        console.log(data);
        const {title, body, created, updated, id} = data;
        console.log(title, body, created, updated, id);
        postTitle.value = title;
        postDescription.value = body;
    } else{
        const err = await response.json();
        throw err.message
    }
}
getPostById().catch( err => {
    console.log(err)
});

editPostForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let isPostTitle = false;
    if (isPostTitle.value.trim().length > 0) {
        postTitleError.classList.add("hidden");
        isPostTitle = true
    } else{
        postTitleError.classList.remove("hidden")
    }
})
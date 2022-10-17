import {getToken} from "./utils/storage";
import {EDIT_POST_URL, GET_POST_BY_ID_URL} from "./settings/api";

const accessToken = getToken();

const editPostForm = document.querySelector("#edit-post-form");
const postTitle = document.querySelector("#postTitle");
const postTitleError = document.querySelector("#postTitleError");
const postDescription = document.querySelector("#postDescription");
const postDescriptionError = document.querySelector("#postDescriptionError");


const paramString = window.location.search
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get("post_id");


async function getPostById() {
    const response = await fetch(`${GET_POST_BY_ID_URL}/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if (response.status === 200) {
        const data = await response.json();
        const {title, body, created, updated, id} = data;
        postTitle.value = title;
        postDescription.value = body;
    } else{
        const err = await response.json();
        throw err.message;
    }
}
getPostById().catch(err => {
    console.log(err)
});

editPostForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let isPostTitle = false;
    if (postTitle.value.trim().length > 0) {
        postTitleError.classList.add("hidden");
        isPostTitle = true;
    } else {
        postTitleError.classList.remove("hidden")
    }

    let isPostDescription = false;


    if (postDescription.value.trim().length > 0) {
        postDescriptionError.classList.add("hidden")
        isPostDescription = true;
    } else {
        postDescriptionError.classList.remove("hidden")
    }
    let isFormValid = isPostTitle && isPostDescription;

    if (isFormValid) {
        const postData = {
            "title": postTitle.value,
            "body": postDescription.value
        };
        const accessToken = getToken();

        (async function createPost() {
            const response = await fetch(`${EDIT_POST_URL}/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(postData)
            })
            if (response.ok) {
                const data = await response.json();
                location.href = `single-post.html?post_id=${postId}`
            } else {
                const err = await response.json();
                const message = "Edit post failed"
                throw new Error(message)
            }
            editPostForm.reset();
        })().catch(err => {
            console.log(err)
        });
    }else {
        console.log("validation failed")
    }

})

import {getToken} from "./utils/storage.js";
import {CREATE_POST_URL, GET_POSTS_URL} from "./settings/api.js";
const createPostForm = document.querySelector("#create-post-form");

const postTitle = document.querySelector("#post-title");
const postTitleError = document.querySelector("#postTitleError");

const postDescription = document.querySelector("#postDescription");
const postDescriptionError = document.querySelector("#postDescriptionError");



console.log("Every element: ",postDescriptionError, postDescription, postTitleError, postTitle, createPostForm );

createPostForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let isPostTitle = false;
    if (postTitle.value.trim().length > 0) {
        postTitleError.classList.add("hidden");
        isPostTitle = true
    } else{
        postTitle.classList.remove("hidden")
    }
    let isPostDescription = false;
    if (postDescription.value.trim().length > 0) {
        postDescriptionError.classList.add("hidden");
        isPostDescription = true;
    } else {
        postDescriptionError.classList.remove("hidden")
    }
    let isFormValid = isPostTitle && isPostDescription;

    if (isFormValid) {
        console.log("validation is working");
        console.log(postTitle.value)
        console.log(postDescription.value);
        const postData = {
            "title": postTitle.value,
            "body": postDescription.value
        };
        console.log(postData)
        const accessToken = getToken();
        console.log(accessToken)
        console.log(CREATE_POST_URL);
        (async function creatPost() {
            const response = await fetch(CREATE_POST_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(postData)
            })
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                console.log("POST was created")
                location.href = "/index.html"
            } else {
                const err = await response.json();
                const message = "Creating post failed";
                throw new Error(message)
            }
            createPostForm.reset();
        })().catch(err => {
            console.log(err)
        });

    } else {
        console.log("validation failed")
    }
})
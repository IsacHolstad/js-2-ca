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
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    console.log("response ", response);
    if (response.status === 200) {
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
console.log(isPostTitle)

editPostForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let isPostTitle = false;

    //TODO cannot read trim() method

    if (isPostTitle.value.trim().length > 0) {
        postTitleError.classList.add("hidden");
        isPostTitle = true
    } else{
        postTitleError.classList.remove("hidden")
    }

    let isPostDescription = false;

    //TODO cannot read trim() method

    if (isPostDescription.value.trim().length > 0) {
        postDescriptionError.classList.add("hidden")
        isPostDescription = true;
    } else {
        postDescriptionError.classList.remove("hidden")
    }
    let isFormValid = isPostTitle && isPostDescription;
    console.log(isFormValid)

    if (isFormValid) {
        console.log("success")
        console.log("hehhejedjejdjejkffkkfkfk", postTitle.value)
        console.log(postDescription)
        const postData = {
            "title" : postTitle.value,
            "body": postDescription.value
        };
        console.log(postData)
        const accessToken = getToken()
        console.log(accessToken)
        (async function editPost() {
            const response = await fetch(`${EDIT_POST_URL}/${postId}`, {
                method: "PUT",
                headers :{
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(postData)
            })
            console.log(response)
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                console.log("post has been edited")
                location.href = `single-post.html?post_id=${postId}`
            }
            else {
                const err = await response.json();
                const message = "Edit post failed"
                throw new Error(message)
            }
            editPostForm.reset();
        })().catch(err => {
            console.log(err)
        })
    }else {
        console.log("validation failed")
    }
})
console.log(editPostForm)
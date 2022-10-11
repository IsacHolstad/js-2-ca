import {getToken} from "./utils/storage.js";
import {GET_POSTS_URL} from "./settings/api.js";
const createPostForm = document.querySelector("#create-post-form");

const postTitle = document.querySelector("#post-title");
const postTitleError = document.querySelector("#postTitleError");

const postDescription = document.querySelector("#postDescription");
const postDescriptionError = document.querySelector("#postDescriptionError");



console.log("Every element: ",postDescriptionError, postDescription, postTitleError, postTitle, createPostForm );


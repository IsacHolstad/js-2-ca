// vite.config.js
import {resolve} from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                home: resolve(__dirname, 'index.html'),
                signup: resolve(__dirname, 'signup.html'),
                login: resolve(__dirname, 'login.html'),
                welcome: resolve(__dirname, 'welcome.html'),
                createPosts: resolve(__dirname, 'creat-post.html'),
                singlePosts: resolve(__dirname, 'single-post.html'),
                editPosts: resolve(__dirname, 'edit-post.html'),
                myPosts: resolve(__dirname, 'my-posts.html'),
                myProfilePage: resolve(__dirname, 'profile-page.html')

            }
        }
    }
});
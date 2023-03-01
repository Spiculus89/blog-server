<h1 align="center">Welcome to blog-server 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Backend with authentication for creating, editing and deleting blog posts and comments

## Install

```sh
npm install
```

## Usage

```sh
npm start
```

## Tests

```sh
localhost:5000/api

/auth
POST /auth/register
Request: 
"email" "name" "password"

POST /auth/login
Request:
"email" "password"

POST /auth/logout
Bearer token

:id is always the ObjectId of the post

/posts
GET /posts
GET /posts/:id

POST /posts/create
Bearer token
"title" "description" "userId"

PUT /posts/update/:id
Bearer token
"title" || "description"

DELETE /posts/delete/:id
Bearer token

PUT /posts/comments/add/:id
Bearer token
"text" "userId"

PUT /posts/comments/edit/:id
Bearer token
"text" "userId"

DELETE /posts/comments/delete/:id
Bearer token
"commentId"
"userId"
```

## Author

👤 **Amar Alibegovic**

* Github: [@Spiculus89](https://github.com/Spiculus89)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
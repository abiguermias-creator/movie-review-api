# Movie Review REST API

## Objective

This project is a simple REST API built using Node.js core modules (`http` and `fs`) without using Express or any external frameworks.

It performs full CRUD operations (Create, Read, Update, Delete) for managing movie reviews and stores data in a JSON file.

---

## Features

- Create a new movie review
- Get all movie reviews
- Get a single movie review by ID
- Update an existing movie review
- Delete a movie review

---

## Technologies Used

- Node.js
- http module
- fs module
- JSON file storage
- Postman for API testing

---

## API Routes

### GET all movies

GET /movies

### GET movie by ID

GET /movies/:id

### POST new movie

POST /movies

Example JSON:

{
  "title": "Inception",
  "genre": "Sci-Fi",
  "rating": 9,
  "review": "Mind-blowing movie",
  "releaseYear": 2010
}

### PUT update movie

PUT /movies/:id

### DELETE movie

DELETE /movies/:id

---

## How to Run

1. Open terminal in project folder
2. Run:

node server.js

3. Open browser or Postman and test:

http://localhost:3000/movies

---

## Author

Student project submission for Web II Assignment 1
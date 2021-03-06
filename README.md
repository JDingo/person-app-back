# Person App Backend
This project is the backend for a Person App which stores a person's first name, last name and age. The backend runs on Node.js and uses MongoDB (Atlas) as a database. The purpose of this project is Netum's preassignment.

## Description
The backend manages calls to the backend's API. The API endpoints can be found in the folder `routes`. The backend interacts with a database provided by MongoDB Atlas, and the address to the database is provided in the environment variables.

The backend uses TypeScript and runs on Node.js. It uses `mongoose`-library to model application data and interact with MongoDB database.

The backend can be found here: [Backend](https://github.com/JDingo/person-app-front)

## Usage
The application is hosted by Heroku. It can be accessed here: 
https://person-app-netum.herokuapp.com.

The backend supports
  - adding a new person to the database.
  - removing a person from the database.
  - fetching all persons from the database.
  - fetching a single person by id from the database.
  - editing a person by id in the database.

### Installation
To set up development environment:

  - git clone
  - npm install
  - npm run dev
  - Open http://localhost:3001
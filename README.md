# Trivia application

## Table of Contents

1. [Preamble](#preamble)
2. [Installing](#installing)
3. [Starting the development environment](#starting-the-development-environment)

    1. [Client](#client)
    2. [Server](#server)
    3. [Heroku deployment](#heroku-deployment)
4. [Troubleshooting](#troubleshooting)
    1. [The shell scripts won't run](#the-shell-scripts-wont-run)
    2. [The application is unable to find any games](#the-application-is-unable-to-find-any-games)

- - -

## Preamble

This project started out as a simpler alternative to websites such as Quizlet or Kahoot, and for now does not require the user to sign up in order to make and host quizzes and trivias. It is thus suitable for plug-and-play environments such as education institutes, or parties.

- - -

## Installing

To install the the application with the required dependencies, simply run the ```npm install``` at root of project (main package.json):

- - -

## Starting the production environment
From root folder command ```npm run start:production``` starts whole application in production mode
## Starting the development environment
From root folder command ```npm run start:dev``` starts whole application in development mode on one terminal. 
### Client and Server in individual terminals 

For running the client, navigate to the client folder and command ````npm start``` will start development server, default port is 3000
For running the server, navigate to the server folder and ```npm run dev``` will start development server, default port is 8080

You may also need to create your own .env-file with a URI to a MongoDB database (we will not provide one for you.). By default the server port is 8080.

The .env file should have the following structure:
```
MONGODB_URI=<MongoDB connection URI>
PORT=8080 (optional, server will run on port 8080 even without configuring this)
```

- - -

### Heroku deployment

For your convenience, this app is already running on Heroku at [trivia-online.herokuapp.com](https://trivia-online.herokuapp.com), and can be viewed at any time over there. It may or may not be the latest version, but we're working very hard on updating it as we go along.

- - -

## Troubleshooting

- - -

### The application is unable to find any games

You need to spin up the backend server on another terminal for the websockets and API interface to work. Also MongoDB backend must be provided to make game work.

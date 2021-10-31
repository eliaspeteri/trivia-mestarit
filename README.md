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

To install the the application with the required dependencies, simply run the provided shell script called install.sh. It runs the following code snippet:
```sh
# compile game-common dependencies
echo "===Installing game-common dependencies, please wait...==="
cd server/game-common
npm run compile
echo "===Installing server dependencies, please wait...==="
# install server dependencies
cd ..
npm i
echo "===Installing client dependencies, please wait...==="
# install client dependencies
cd ../client
npm i
echo "===Install done, please enjoy!==="
echo "For client, run client.sh"
echo "For server, run server.sh"
```

- - -

## Starting the development environment

### Client

For running the client, navigate to the project root folder and start the shell script called client.sh. This runs the following code snippet:

```sh
cd client
npm start
```

You can then navigate to *localhost:3000* for the web application to start a new game or join one. The server is required to be running for the websockets to connect to, and to interface with the API and thus, the database.

- - -

### Server

For running the server, navigate to the project root folder and start the shell script called server.sh. It runs the following code snippet:

```sh
cd server
npm run dev
```

This is required for the backend of the application to work properly. You may also need to create your own .env-file with a URI to a MongoDB database (we will not provide one for you.), and at the very least, a port to run the server on. By default the server port is 8080.

The .env file should have the following structure:
```
MONGODB_URI=<MongoDB connection URI>
PORT=8080
```

Note that more variables may be required to add here in the future.

For production version, you likely want to set your pipeline to run
```sh
cd server
npm start
```
or, run ```npm start``` manually in the server-folder.

- - -

### Heroku deployment

For your convenience, this app is already running on Heroku at [trivia-online.herokuapp.com](https://trivia-online.herokuapp.com), and can be viewed at any time over there. It may or may not be the latest version, but we're working very hard on updating it as we go along.

- - -

## Troubleshooting

### The shell scripts won't run

If you're running a Linux distro, you may or may not run these commands in the terminal to enable running the shell scripts
```sh
chmod +x client.sh
chmod +x server.sh
chmod +x install.sh
```

- - -

### The application is unable to find any games

You need to spin up the backend server on another terminal for the websockets and API interface to work.

# Vanilla HTTP server

## General description

This is a basic server app that a developer can access using GET and POST requests. The server will send responses to a developer notifying them of the request status.

## How do I use this app?

* Clone this repo and run the command `npm i` in your terminal to install all of the dependencies, including the cowsay API that embeds a server response in a cow illustration.

* You will also need to run the command `brew install httpie`. For this app, the requests used in the terminal are formatted via HTTPie CLI.

* Open 2 panes in your terminal to see how you, as the developer, can communicate with this server.

* Be sure that you are in the root of the repo directory before attempting to initiate the port to the server. To do this, run `node server.js` in the first terminal pane.
  * `server running:` followed by your PORT number should be logged in the terminal

### GET requests
  * **i.e.** 200 OK request: `http localhost:8000/cowsay text=='message'`
    * You should receive a cowsay response with your embedded message.
  * **i.e.** 200 OK request: `http localhost:8000`
    * You should receive a response of `hello from my server!`.
  * **i.e.** 400 BAD request: `http localhost:8000/cowsay text: 'message'`
    * You should receive a cowsay response with a 'bad request' message.

### POST requests
  * **i.e.** 200 OK request: `http POST localhost:8000/cowsay text=message` OR `http POST localhost:8000/cowsay text='post request works'`
    * You should receive a cowsay response with your embedded message.
  * **i.e.** 400 BAD request: `http POST localhost:8000/cowsay` (no message attached to POST)
    * You should receive a cowsay response with a 'bad request' message.

GET and POST request commands should be ran in the second terminal pane. Notice that a GET request requires only 1 `=` while a POST request requires `==`. This is the proper HTTPie format for those requests.

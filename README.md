### HTTP Cowsay Project

This is a fun project where you can practice GET and POST requests using HTTPIE and the Cowsay npm package! Woo!

A visualization of the HTTP Cowsay project may be seen below (credit to [Brian Nations](https://github.com/bnates)):

![alt text](https://raw.githubusercontent.com/codefellows/seattle-javascript-401d12/master/07-http_and_rest_apis/demo/visualization/http-server.png)

### Get the Project Running

To get this project running, type the following in your command line:

1. `git clone https://github.com/brittdawn/07-vanilla-http-server.git`
2. `cd 07-vanilla-http-server.git`
3. `npm i`
4. `brew install httpie`
4. `node server.js`

You will now see the phrase "server is up: 3000" if you have not already specified a port number.

### Test the Vanilla HTTP Server

1. Open a new terminal located at the root of this project and type `http localhost:3000/`
2. You should get a response saying 'hello from my server'
3. Play with the GET and POST requests below.

### Interacting with HTTP Endpoints

To make an initial GET request, type this in the terminal: `http localhost:3000/cowsay?text=hi`. A cow will appear with a text of hi. If you have made a bad request, a sad Ren will appear. You can change the text to whatever you would like.

To make a POST request, type this in the terminal: `http POST localhost:3000/cowsay text=hello`. You can change the text to whatever you would like.

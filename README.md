# Vanilla HTTP Server

This project creates a local http server and allows users send GET and POST requests through the terminal.
When sending GET and POST requests with filepath ```/cowsay``` with a query, a response will return with
a cute cow.

## How to run

Install any Dependencies from the ```package.json``` file into the project root
directory. Using node, you can run the command ```npm i``` to install all
depenenedcies.

## Running server

Run the ```server.js``` file using command ```node server.js```. You should see ```Server running on PORT: 8000``` in terminal.

## Sending GET and POST Request

>GET Request

In an new terminal window, send a GET request by using the command ```http localhost:8000```. To receive a response with a cow, include
```/cowsay``` and a text query. Example: ```http localhost:8000/cowsay?text='hello there'```.
```
 -------------
< hello there >
 -------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||

```

>Post Request

In an new terminal window, send a POST request by using the command ```http POST localhost:8000```. To receive a response with a cow,
include ```/cowsay``` and a text message. Example: ```http localhost:8000/cowsay text='hello there'```.

>One cool thing

In a GET request, use ```dragon``` for your text query.


## Closing server

In server terminal, enter ```control``` + ```c```.

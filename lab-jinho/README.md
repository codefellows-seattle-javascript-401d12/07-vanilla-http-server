# Cowsay API
=============

>

## Getting Started


### Prereqs

- dependencies:
    cowsay: ^1.1.9  --> npm install -S cowsay


## Running

In root server, type in the command **"node server.js"** in first terminal pane.

In Second Terminal Pane :

- For Get Request:
    ``` http localhost:3000/ : will respond with Hello From The Server```
    ``` http localhost:3000/cowsay text=='some text' : will respond with cowsay```

In Third Terminal Pane:
- For POST Request:
    ``` we need a json file in root directory like: data.json with simple json string```
    ``` cat data.json | http post localhost:3000/cowsay : will show json data using cowsay```

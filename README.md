# Cowsay HTTP Server

The cowsay module is a fun module for wrapping text.

# How to install

- Clone this repository, run `git clone https://github.com/geoffsimons/07-vanilla-http-server.git`
- Run `npm i` to install dependencies
- To startup the server: `node server.js`

# API

This server follows RESTful ideology, with the following routes:
* GET /
--Get a greeting as text/plain
* GET /cowsay?text=Something+to+say[&f=<cow_name>]
- `text` should be a URL encoded string to wrap
- `f` is what cow you want to have speak
* POST /cowsay
```js
{
  text: 'Something to say (REQUIRED)',
  f: 'beavis.zen'
}
```
See the cowsay docs for more cow names.
https://github.com/piuccio/cowsay/tree/master/cows

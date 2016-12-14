# Vanilla HTTP server

This server accesses the cowsay API, and allows the user to make GET and POST requests. On response, the user should receive a cow that displays a message of the users choice.

### Set-Up

In your Terminal, run `brew install httpie`. NOTE: you must have homebrew installed to do this. `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Run `npm i` to install proper dependencies. You should receive cowsay in your package.json file.

Run `node server.js` to start your server. You will receive a response of 'server live on PORT: `<PORT>`'


### Use

Making a GET request
* Run `http localhost:<PORT>/cowsay text=='<message>'`
* This will update the query text to have the cow say your <message>
* You will also receive a status code of 200.

* If you run `http localhost:<PORT>/cowsay` you should receive a 400 status code, and a message of 'bad request'

Making a POST request
* Run `http POST localhost:<PORT>/cowsay text='<message>'`
* This will update the body to have the cow say your <message>
* You will also receive a status code of 200.

* If you run `http POST localhost:<PORT>/cowsay` you should receive a 400 status code, and a message of 'bad request'

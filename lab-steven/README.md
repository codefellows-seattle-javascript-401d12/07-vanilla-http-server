#Basic GET and POST server
###HTTP server practice for lab 7, 401 JavaScript

This is a simple module that will allow a user to practice sending GET and POST requests through the terminal using HTTPIE. You can install HTTPIE by running `brew install httpie` on a MAC or `sudo apt install httpie` on Linux.

In order to use this Node app, clone down the repository, then navigate to its directory and run `npm i`. Once that's complete, run `node server.js`. You should see a confirmation message of 'Server running on port <port#>'.

You can now test your server by opening up another terminal shell or using another tab to run HTTPIE.

###Usage

You can test the connection to your server by simply connecting to the root. For example: `http localhost:8080/`. You should get back a response header with a status of 200 and a body response of "Hello from my server!"

You can make requests to the cowsay API by appending `/cowsay` to the end of your URL path. For example: `http localhost:8080/cowsay`.

For GET and POST requests, you will need to include a text=message header with your request. For GET requests, this will be a query string. Example: `http localhost:8080/cowsay?text=<message>` OR `http localhost:8080/cowsay text==message`. The double equals is important for queries using HTTPIE. For POST requests, you will need to include the argument POST before the URL, then include your header properties as additional arguments. For example: `http POST localhost:8080/cowsay text=message`. Note that POST requests only use a single equals.

Cowsay has a litany of cows you can use to respond back, and this app allows you to pass an additional, optional `cow` header with your request to see different cows. For example: `http localhost:8080/cowsay text=<message> cow=dragon-and-cow` will instead show your message with a dragon burninating a cow. A full list of all available cows can be found here: `https://github.com/piuccio/cowsay/tree/master/cows`. If you try to enter a cow that cowsay doesn't recognize, it will simply display the default cow. We definitely, emphatically, wholeheartedly do not recommend trying `cow=sodomized` or `cow=bong`.

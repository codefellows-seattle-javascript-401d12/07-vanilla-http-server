**Documentation for Cowsay API, a demonstration of a basic Node HTTP server**

Use query strings to have the cow repeat the text you enter. This documentation assumes you are using a Mac and have httpie installed.

* To run this app, clone down the repo and run npm i to install the dependencies. In a terminal window in the root directory of the app, type `node server.js`.

* In a separate terminal window (location for this window doesn't matter), and type `http :8000/` or `http POST :8000/`. You will get a welcome message printed in the terminal and an http response with 200-OK status code.

* Let's make a request to the /cowsay route. type `http :8000/cowsay`. You should get a cow printed in your response with a speech balloon saying "Welcome to Cowville."

* You can make the cow say anything you want by simply adding a query string to the end of the url, with 'text' as the key. For example, if you type `http :8000/cowsay?text=cows+say+mooooo` or `http POST :8000/cowsay?text=cows+say+mooooo`, your cow will say "cows say mooooo". The plus signs in the query string indicate spaces.

* if you try to submit `http POST :8000/cowsay`, your cow will give you a bad request response, accompanied by a 400 error status code.

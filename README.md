# Cowsays server

## About Cowsays server
Cowsays server is a simple vanilla server that tests URLs and query strings and returns a fun Cowsays response. The goal of the Cowsays server is to learn how to use NodeJS's `createServer` method. Cowsays server was built on Mac OS and is intended to be run in the terminal. In order to run the Cowsays server you will need to have NodeJS installed on your local machine as well as run `npm i` to pull down the required `cowsays` dependency.

## How to use Cowsays
1. Fork this repo
2. `git clone <YOUR FORKED REPO>` to your local machine.
3. Navigate into the root file `07-vanilla-http-server`.
4. Run `npm i` in order to install all dependencies.
5. Run `node server.js` or if you have nodemon installed `nodemon server.js`.
6. The server will spin up and will return a `PORT` number the server is running on (i.e. `server started on 3000`). Take note of this `PORT` number as it will be needed later to run the cowsays commands.
7. Open a separate terminal window/tab.
 * _this is where we will run the cowsays commands_

## Commands in Cowsays
* `http :<PORT>/` - will return a status of `200` and a message of `hello from my server!`
* `http :<PORT>/cowsay` - will return a status of `400` and a message of:
```
 -------------
< bad request >
 -------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
* `http :<PORT>/cowsay?text='<YOUR TEXT HERE>'` - will return a status of `200` and a message of:
```
 ----------------
< YOUR TEXT HERE >
 ----------------
       \   ^__^
        \  (oo)\_______
           (__)\       )\/\
               ||----w |
               ||     ||
```
* `http POST :3000/cowsay` - will return a status of `400` and a message of:
```
 -------------
< bad request >
 -------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
* `http POST :3000/cowsay text=<YOURTEXTHERE>` - will return a status of `200` and a message of:
```
 --------------
< YOURTEXTHERE >
 --------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
 * _NOTE: `<YOURTEXTHERE>` cannot contain any spaces but it can contain special characters like underscores or dashes._
_**Note:** at this time cowsays server accepts a limited number of commands but it could be customized to accept additional or different URLs with some simple changes to the `server.js` file._


## Making the Cowsay different things
* If you want to update the cowsays server to test different urls you can easily do so by opening the `server.js` file.
* In the `server.js` file you will find several locations where `req.url.pathname === '/'` is used. By updating the `'/'` to `'/WHATEVER/PATH/YOU/WANT'` you can customize Cowsays server to respond to any URL path.

#MenagerieServer by Kyler Dotson
It's an http server on `$PORT` containing many exotic and stoned animals
##How to use
###*Start server with `npm start`
*A welcome message:
  *`http localhost:<port>/`
*A custom message:
  *`http localhost:<port>/cowsay?text=<message>` or
  *`http POST localhost:<port>/cowsay text=<message>`
*A custom message from a custom animal:
  *`http localhost:2000/cowsay?text=<message>&cow=<animal>` or
  *`http POST localhost:<port>/cowsay?cow=<animal> text=<message>`
*An error:
  *`http localhost:2000/cowsay` or
  *`http POST localhost:2000/cowsay`

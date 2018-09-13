# React Universal app server

App server for [React Universal](https://github.com/by12380/react-universal) apps featuring [Express.js](https://expressjs.com/) and [Mongo DB](https://www.mongodb.com/).


## Server setup


1. Sign in Auth0 account
2. Go to 'Application' -> [Your App Name] -> 'Settings'
3. Copy
    - Domain

    To `./Server/config.js`

    - AUTH0_DOMAIN

4. Go to 'APIs' -> [Your App Name] -> 'Settings'
5. Copy
    - Identifier

    To `./Server/config.js`

    - AUTH0_API_AUDIENCE
6. Run package manager
```
cd ./Server
yarn
```
\* Steps 1-5 is for using Auth0 as our social login platform

## Run app

```
yarn start
```

\* Don't forget to run mongo DB before starting the server!
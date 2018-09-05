# Electron with social login

Minimum starter kit for React-Redux desktop app featuring [Electron](https://electronjs.org/) and social login (Auth0)


## Electron App setup

1. Sign in Auth0 account
2. Go to 'Application' -> [Your App Name] -> 'Settings'
3. Copy
    - Domain
    - Client ID
    - Client Secret

    To `./Client/Electron/src/actions/auth0/config.js`

    - AUTH0_DOMAIN
    - AUTH0_CLIENT_ID
    - AUTH0_CLIENT_SECRET
    (respectively)

4. Go to 'APIs' -> [Your App Name] -> 'Settings'
5. Copy
    - Identifier

    To `./Client/Electron/src/actions/auth0/config.js`

    - AUTH0_API_AUDIENCE
6. Run package manager
```
cd ./Client/Electron
yarn
```
\* Steps 1-5 is for using Auth0 as our social login platform

## Run app

```
yarn start
```


## Build
### For Windows
```
yarn build:win
```
### For Mac
```
yarn build:mac
```
### For Linux
```
yarn build:linux
```

# Web app with social login

Minimum starter kit for React-Redux web app bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and social login (Auth0)


## Web App setup (for development)


1. Sign in Auth0 account
2. Go to 'Application' -> [Your App Name] -> 'Settings'
3. Copy
    - Domain
    - Client ID

    To `./Client/Expo/config.js`

    - AUTH0_DOMAIN
    - AUTH0_CLIENT_ID
    (respectively)

4. Go to 'APIs' -> [Your App Name] -> 'Settings'
5. Copy
    - Identifier

    To `./Client/Expo/config.js`

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
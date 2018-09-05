# Expo with social login

Minimum starter kit for React-Redux mobile app bootstraped with [Expo Cli](https://expo.io/learn) and social login (Auth0)


## Expo App setup (for development)

1. Sign in Auth0 account
2. Go to 'Application' -> [Your App Name] -> 'Settings'
3. Copy
    - Domain
    - Client ID
    - Client Secret

    To `./Client/Expo/config.js`

    - AUTH0_DOMAIN
    - AUTH0_CLIENT_ID
    - AUTH0_CLIENT_SECRET
    (respectively)

4. Go to 'APIs' -> [Your App Name] -> 'Settings'
5. Copy
    - Identifier

    To `./Client/Expo/config.js`

    - AUTH0_API_AUDIENCE
6. Run package manager
```
cd ./Client/Expo
yarn
```

## Run app

```
yarn start
```
\* For more information on viewing app in development mode please visit:
https://docs.expo.io/versions/v29.0.0/introduction/installation#mobile-client-expo-for-ios-and-android

## Build
\* For build instructions please visit:
https://docs.expo.io/versions/v28.0.0/distribution/building-standalone-apps

## Publish
\* For instructions to publish finished product to App Store (iOS) and/or Play Store (Andriod) please visit:
https://docs.expo.io/versions/v28.0.0/distribution/index.html

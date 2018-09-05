# React Universal App with Social Login Starter Kit

Minimum react-redux starter kit for desktop, mobile, and web app with social login.

Inspired by creating universal apps like Slack, Skype, etc.

## Features
- React (Universal)
- Redux (Universal)
- Electron (Desktop)
- Expo (Mobile)
- Express (App Server) (optional)
- Mongo DB (Database) (optional)

## Social Login
- Auth0 (Default setup) - to demonstrate multiple social login platforms at once (Google, Facebook, Github, etc...)

## Getting started
```
git clone https://github.com/by12380/react-universal.git
cd react-universal
```
## General Setup
- Auth0
- [Web app](./Client/React/)
- [Electron app](./Client/Electron/)
- [Expo app](./Client/Expo/)
- [App server](./Server) (optional)

## Auth0 Setup (for development)
1. Sign in / Register Auth0 account
2. Go to 'Application' -> [Your App Name] -> 'Settings'
3.  In 'Allowed Callback URLs', add

    `http://localhost:3000/callback` (for Web and Electron app)

    `https://auth.expo.io/[Your Expo Account Username]/react-universal` (for Expo app)
    
    In 'Allowed Logout URLs', add

    `http://localhost:3000/`

4.  Go to 'APIs' -> 'Create API'
5.  Set 'Identifier' (ex. https://api.react-universal.com) -> Hit 'Create'
6.  Go to 'Settings' -> Toggle 'Allow Offline Access' -> 'Save'
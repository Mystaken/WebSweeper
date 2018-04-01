# Web Sweeper
Web Sweeper was online gaming platform that allows other people to come in and watch and commentate (similar to twitch.tv). Users can either create a room and begin a game or got spectate other users playing games. There are currently 2 games available: Minesweeper and a shooting game.

## Table of Contents
- [Features](#features)
- [Code Overview](#code-overview)
   - [Dependencies](#dependencies)
   - [Code Structure](#code-structure)
   - [Build and Deploy](#build-and-deploy)
- [API Route Documentation](#api-route-documentation)
- [Web Technology Used & Credits](#web-technology-used-and-credits)
- [Project Team Members](#project-team-members)


## Features
### Minesweeper
A classic minesweeper game that allows users to customize the size of the game board and the number of mines.

<img src="" alt="Image for Minesweeper"/>

### Shooter
A classic 2D arcade-style shooting game that allows users to pick the difficulty of the game.

<img src="" alt="Image for shooter"/> 

### Spectating
Users are able to see a list of people who are currently playing and spectate them. Spectators can communicate with other spectators and the user playing the game with the chat.

<img src="" alt="Image of users communicating with each other in spectate mode"/> 

### Profile customization
Users are able to customize their avatars.

<img src="" alt="Image showing different avatars"/> 


## Code Overview

### Dependencies

- [MongoDB](https://www.mongodb.com/) - the database used by the server.
- [gulpjs](https://gulpjs.com/) - tool used to automate many tasks.
- [apiDoc](http://apidocjs.com/) - used to generate all the documentation for the api routes
- [NodeJS](https://nodejs.org) (>=7.10.1) - Javascript framework used for both front end and backend
- [npm](https://www.npmjs.com/) (>=4.2.0) - Package management tool for NodeJS
- [Angular CLI](https://cli.angular.io/) (>=1.7.3) - client we used to generate our front-end Angular application

In addition, you will also need a [Mailgun](https://www.mailgun.com/) account. This is used to send a verification link to a users email when they sign up.

### Code Structure

 - `api/`  - the code for the back-end server
   - `app.js` - the entry point to our application. This file defines the Express server, sets up connection to MongoDB, and configures the server
   - `assets` - static images and files that are not served served directly, but used by some api routes
   - `controllers/` - contains the route definitions. This is handled by KrakenJS. Please refer to our [API Route Documentation](#api-route-documentation) for details.
   - `models/` - contains the Mongoose models and schemas
   - `config/` - contains the configurations for our application
   - `sockets/` - contains the code that sets up the sockets
   - `lib/` - contains general libraies for our application
   - `templates/` - contains non-statically served files. Mostly `.pug` files.
   - `schemas/`- contains all the schemas used by [z-schema](https://github.com/zaggino/z-schema) to validate the HTTP request
   - `gulpfile.js`- configures all the gulp tasks for api
 - `public/` - the code for the front-end Angular application. Most of this was auto-generated from [Angular CLI](https://cli.angular.io/)
   - `vendor/`- contains third party libaries used
   - `src/app/`- contains the source code for the application
     - `app.module.ts`- The root module. Responsible for setting up routing and other general tasks for other modules
     - `services/` - Contains services that are used by most other components (eg. `api.service`)
     - `users/` - Contains components related to users. (Login/Profile)
     - `common/`- Contains common components for credits and invalid url
     - `games/` - Contains all components/services for the game and lobby
     - `guards/`- used for `routing.module.ts` to check user privilege
   - `gulpfile.js`- configures all the gulp tasks for front-end

### Build and Deploy

Once you have all the dependencies, we can clone and build the application

#### Clone project

```
git clone https://github.com/UTSCC09/WebSweeper
```

#### Install packages

Install packages in both `api` and `public`.

```
cd WebSweeper/public
npm install
cd ../api
npm install
```

#### Fix configurations

There are a few configurations you may need to set for the API
Make a copy of the `mailgun.json` and add your Mailgun configurations to the json.
```
cp config/mailgun.json.template config/mailgun.json
```
Change `mongo.server` in the `/api/config/config.json` file to go to your own MongoDB server.
Update `app.DOMAIN` and `app.PORT` in the `/api/config/config.json`to your desired configuration. Similarly, update the environment in the front-end at `/public/src/environments/environment.prod.ts`

#### Build Application

Run this inside of `api` folder.

```
gulp deploy
```

This will:
   - remove previously build project
   - build the Angular application
   - create the api route documentation

#### Start Server

```
node app.js
```


## API Route Documentation

The API Route is generate from [apiDoc](http://apidocjs.com/) . To generate this separately,  run `gulp doc` and the documentation will be in `doc/index.html`.

You can also visit https://web-sweeper.herokuapp.com/api/doc/ or `${api.domain}/api/doc` once your server is deployed.


## Web Technology Used and Credits
Please visit https://web-sweeper.herokuapp.com/credits or `${api.domain}/credits` once your server is deployed.

## Project Team Members
Team Name: Web Sweeper (yes, it's the same as project name.)

* [Pengyun(Andrew) Wang](https://github.com/A-Kun)
* [Tianxiang(Kevin) Gao](https://github.com/Mystaken)

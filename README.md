# Web Sweeper

Web Sweeper is an online Minesweeper game that allows other people to come in and watch and commentate (similar to Twitch chat). Users can either create a room and begin a game or go spectate and commentate other people playing the game. Users can also upload emotes for spectators to use when commentating in their game rooms and also change the game themes by uploading bomb icons, background images, etc. Each user will also have their personal profile that they can edit.

## Table of Contents
- [Code Overview](#code-overview)
   - [Dependencies](#dependencies)
   - [Code Structure](#code-structure)
   - [Build and Deploy](#build-and-deploy)
- [API Route Documentation](#api-route-documentation)
- [Web Technology Used](#web-technology-used)
  - [Front End Technology](#front-end-technology)
  - [Back End Technology](#back-end-technology)
- [Project Team Members](#project-team-members)

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
   - `app.js` - the entry point to our application. This file defines the Express server, sets up connection to MongoDB, and configures the server.
   - `controllers/` - contains the route definitions. This is automatically required by KrakenJS
   - `models/` - contains the Mongoose models and schemas.
   - `config/` - contains the configurations for our application
   - `sockets/` - contains the code that sets up the sockets
   - `lib/` - contains general libraies for our application
   - `views/` - contains non-statically served files. Mostly `.pug` files.
   - `schemas/`- contains all the schemas used by [z-schema](https://github.com/zaggino/z-schema) to validate the HTTP request.
   - `gulpfile.js`- configures all the gulp tasks for api
 - `public/` - the code for the front-end Angular application. Most of this was auto-generated from [Angular CLI](https://cli.angular.io/)
   - `vendor/`- contains third party libaries used
   - `src/`- contains the source code for the application
   - `gulpfile.js`- configures all the gulp tasks for front-end

### Building and Deploy

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
There are two configurations you may need to set for the API
First, make a copy of the `mailgun.json` and add your Mailgun configurations to the json.
```
cp config/mailgun.json.template config/mailgun.json
```
Second, change `mongo.server` in the `config/config.json` file to go to your own Mongo server.

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
You can also visit `${api.domain}/api/doc` once the server is deployed.

## Web Technology Used
Credits to the technologies used.
### Front End Technology

- [Angular](https://angular.io/)
- [Angular CLI](https://cli.angular.io/)
- [Materialize](http://materializecss.com/)
- [Animate.css](https://daneden.github.io/animate.css/)

### Back End Technology
- [Express.js](https://expressjs.com/)
- [Socket.IO](https://socket.io/)
- [krakenjs](http://krakenjs.com/)
- [Pug](https://pugjs.org)
- [mailgun-js](https://github.com/bojand/mailgun-js)
- [z-schema](https://github.com/zaggino/z-schema)
- [mongoose](http://mongoosejs.com/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [sanitizer](https://github.com/theSmaw/Caja-HTML-Sanitizer)

### Other Credits
- Background pictures
   - https://pixabay.com/en/retro-perspective-grid-tron-synth-1548260/
   - https://pixabay.com/en/the-speaker-grill-texture-2184439/
## Project Team Members
Team Name: Web Sweeper (yes, it's the same as project name.)
* [Pengyun(Andrew) Wang](https://github.com/A-Kun)
* [Tianxiang(Kevin) Gao](https://github.com/Mystaken)
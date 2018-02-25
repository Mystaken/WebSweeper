# Web Sweeper
Team Name/Project Name: Web Sweeper

#### Team Members
* [Pengyun(Andrew) Wang](https://github.com/A-Kun)
* [Tianxiang(Kevin) Gao](https://github.com/Mystaken)

### Description
Web Sweeper is an online Mine-Sweeper game that allows other people to come in and watch and commentate (similar to Twitch chat). Users can either create a room and begin a game or go spectate and commentate other people playing the game. Users can also upload emotes for spectators to use when commentating in their game rooms and also change the game themes by uploading bomb icons, background images, etc. Each user will also have their personal profile that they can edit.

### Features for Beta
* Users will be able to create a room and be a host for a game
* Users will be able to upload emotes for their spectators to use in their game room
* Users will be able to view a list of rooms currently live, enter one, and become a spectator for a game
* The host of the room will be able to play MineSweeper
* Everyone in the room will get updated comments from the chat box
* There will be an anti-cheat mechanism to prevent hosts from getting additional information on the state of the game board
* OAuth for login


### Features for Final product
* Users will be able to customize their own profile
* Users will be able to customize the game boards
* There will be a filter in the chat box for bad words
* Fully responsive to all mobile and tablet devices


### Web Technology Used
* NodeJS + ExpressJS + KrakenJS for backend
* Angular for frontend framework
* Foundation for CSS Framework

### Top 5 Technical Challenges
1. Creating a web socket for P2P connection
2. Creating a good database design so that our application can be efficient for multiple concurrent users and games
3. Making sure every user has the correct authorization (ex. spectators should not be able to play the game)
4. Making the application fully responsive.
5. Getting familiar with new frameworks such as Angular

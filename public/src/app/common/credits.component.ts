import { Component } from '@angular/core';

@Component({
  selector: 'credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent {
  curr: number = 0;
  credits: Array<Credit> = [{
    name: 'Back-end',
    credits: [{
      title: 'MongoDB',
      description: 'The primary databased used.',
      link: 'https://www.mongodb.com'
    },{
      title: 'NodeJS',
      description: 'The Javascript framework used.',
      link: 'https://nodejs.org'
    },{
      title: 'Socket.IO',
      description: 'Used to estabilish real-time bi-directional communication with client. (For chat and minesweeper)',
      link: 'https://socket.io'
    },{
      title: 'krakenjs',
      description: 'Framework used to structure application and speed development',
      link: 'http://krakenjs.com'
    },{
      title: 'Pug (Jade)',
      description: 'Used to create flexible HTML. The main use case at the moment is creating verification emails.',
      link: 'https://pugjs.org'
    },{
      title: 'sharp',
      description: 'Used to format images',
      link: 'https://www.npmjs.com/package/sharp'
    },{
      title: 'mongoose',
      description: 'Used to communicate with MongoDB',
      link: 'http://mongoosejs.com'
    },{
      title: 'PeerJS',
      description: 'Library used to handle WebRTC for the shooter game.',
      link: 'http://peerjs.com/'
    },{
      title: 'bcrypt',
      description: 'Hashing is done here. Used when hashing user\'s password and creating application versions.',
      link: 'https://github.com/kelektiv/node.bcrypt.js'
    },{
      title: 'sanitizer',
      description: 'Used to strip HTML tags from strings in requests',
      link: 'https://github.com/theSmaw/Caja-HTML-Sanitizer'
    },{
      title: 'apiDoc',
      description: 'Tool used to create the API docs',
      link: 'http://apidocjs.com'
    },{
      title: 'MongoDB',
      description: 'The primary databased used.',
      link: 'z-schema'
    }]
  },{
    name: 'Front-end',
    credits: [{
      title: 'Angular',
      description: 'The front-end framework used',
      link: 'https://angular.io/'
    },{
      title: 'Angular CLI',
      description: 'Used to build the front-end',
      link: 'https://cli.angular.io/'
    },{
      title: 'Materialize',
      description: 'Primary CSS framework used',
      link: 'http://materializecss.com/'
    },{
      title: 'angular2-materialize',
      description: 'Adds support for Materialize components for Angular2',
      link: 'https://github.com/InfomediaLtd/angular2-materialize'
    },{
      title: 'color-hash',
      description: 'Generates a random color from a string. Used for styling the chat',
      link: 'https://github.com/zenozeng/color-hash'
    },{
      title: 'jQuery',
      description: 'Not used directly, but used by Materialize  ',
      link: 'https://jquery.com'
    }]
  },{
    name: 'Other',
    credits: [{
      title: 'gulpjs',
      description: 'Tool used to automate many tasks in back-end and front-end',
      link: 'https://gulpjs.com/'
    },{
      title: 'favicon.ico',
      description: 'The favicon used (resized).',
      link: 'http://img2.wikia.nocookie.net/__cb20140120061808/creepypasta/images/e/e2/Anime-Girl-With-Silver-Hair-And-Purple-Eyes-HD-Wallpaper.jpg'
    },{
      title: 'default avatar',
      description: 'The picture used for default avatar (resized).',
      link: 'http://img2.wikia.nocookie.net/__cb20140120061808/creepypasta/images/e/e2/Anime-Girl-With-Silver-Hair-And-Purple-Eyes-HD-Wallpaper.jpg'
    },{
      title: 'shooter player avatar',
      description: 'The avatar used for the player in the shooter game (resized)',
      link: 'https://static.myfigurecollection.net/pics/figure/big/357024.jpg'
    },{
      title: 'shooter projectile',
      description: 'The image used for the projectile of shooter game (resized)',
      link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtnoHpboAMYomp0N2PDQK1fCJbeVSaxvr6RY_I0LfzADaud397'
    },{
      title: 'shooter enemy avatar',
      description: 'The avatar used for the enemy in the shooter game (resized)',
      link: 'https://vignette.wikia.nocookie.net/villains/images/4/41/Lord_Boros.png/revision/latest?cb=20180303005022'
    },{
      title: 'background image',
      description: 'image used for styling  the background',
      link: 'https://pixabay.com/en/retro-perspective-grid-tron-synth-1548260/ '
    },{
      title: 'top nav image',
      description: 'image used for styling a top nav',
      link: 'https://pixabay.com/en/the-speaker-grill-texture-2184439/'
    }]
  }]
}

interface Credit {
  name: string,
  credits: Array<{title: string, description: string, link: string}>
}
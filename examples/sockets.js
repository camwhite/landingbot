'use strict';

const socket = require('socket.io');
const Landingbot = require('landingbot');

const hook = 'Your slack incoming webhook';
const customExpressions = [
  {
    regex: /Who\ is\ Cam/ig,
    question: 'Who is Cam?',
    response: 'Scroll through this site to find out about Cam and what he does.'
  }
];

let bindListeners = (io) => {
  io.on('connection', (socket) => {
    // Instaniate a new bot instance for every connecting user
    let landingbot = new Landingbot({
      name: 'landingbot',
      page: 'Cam\'s site',
      owner: 'Cam',
      slack_hook: hook
    }, customExpressions);

    // Greet connecting user
    socket.emit('msg', landingbot.greetUser());

    socket.on('msg', (message) => {
      if(!landingbot.hasPinged) {
        // Check message contents and respond accordingly
        socket.emit('msg', landingbot.respondToUser(message, socket.id));
      }
      else {
        landingbot.sendToSlack(message);
      }
    });

    socket.on('disconnect', () => landingbot = null);
  });

  // Expose global io that can be used anywhere
  global.io = io;
};

exports.connectTo = (server) => {
  const io = socket(server);
  bindListeners(io);
};

'use strict';

const socket = require('socket.io');
const Bot = require('landingbot');

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
    let bot = new BotUtil({
      name: 'landingbot',
      page: 'Cam\'s site',
      owner: 'Cam',
      slack_hook: hook
    }, customExpressions);

    // Greet connecting user
    socket.emit('msg', bot.greetUser());

    socket.on('msg', (message) => {
      if(!bot.hasPinged) {
        // Check message contents and respond accordingly
        socket.emit('msg', bot.respondToUser(message, socket.id));
      }
      else {
        bot.sendToSlack(message);
      }
    });

    socket.on('disconnect', () => bot = null);
  });

  // Expose global io that can be used anywhere
  global.io = io;
};

exports.connectTo = (server) => {
  let io = socket(server);
  bindListeners(io);
};

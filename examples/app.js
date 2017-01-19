'use strict';

const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

app.post('/api/bot', (req, res) => {
  if(req.body.token != 'Your slack token') { return res.sendStatus(400) }

  if(req.body.user_name == 'The user or users allowed to respond to messages') {
    let parsed = req.body.text.split(' ');
    let id = parsed.splice(0, 1);

    global.io.to(id).emit('msg', {
      from: 'Whomever you want it to be from',
      text: parsed.join(' ')
    });
  }

  res.sendStatus(200);
});

module.exports = app;

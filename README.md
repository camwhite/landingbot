# Installion

`npm i landingbot -S`

# Requirements

*If used on the server-side a signaling channel is necessary, such as [socket.io](https://socket.io)*

- node >= v6

# Usage

Landingbot can be used with no additional options, like below.

```
const Bot = require('landingbot');
let bot = new Bot();
```

Or with an options object like this

```
let bot = new Bot({
  name: 'Cambot',
  page: 'Cam\'s site',
  owner: 'Cam'
});
```

Additionally a `slack_hook` can be specified in the options, to allow for realtime correspondece via Slack. You must create an [incoming webhook](https://slack.com/services/new/incoming-webhook) with Slack.

*Note: This is only step one of two to enable back and forth communication from Slack to landingbot and vice versa*

### Want to use Custom Expressions?

Well you can do that too! The second arguement of the constructor accepts an array of objects formatted as such...

```
{
  regex: /Is\ this\ some\ question/ig,
  question: 'Is this some question?',
  response: 'Landingbot's reply to the question'
}
```
# Examples

Using landingbot on the server-side with socket.io and incorporating Slack. 
This example assumes your client is listening for a `msg` event as well as emitting 
one for every new message.

```
const socket = require('socket.io');
const Bot = require('landingbot');

const hook = '<your-slack-hook>';
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
    let bot = new Bot({
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

// This would get called after having your http server listening
exports.connectTo = (server) => {
  const io = socket(server);
  bindListeners(io);
};
```

Remeber how I mentioned there were two steps to enable back and forth comms within Slack? 
Well in this configuration the next step is as follows.. 
First create an [outgoing webhook](https://slack.com/services/new/outgoing-webhook) with Slack. 
Then you need your server to handle a post to whatever hook url you specified, maybe something like this...

```
app.post('/api/bot', (req, res) => {
  if(req.body.token != '<your-token-provided-by-slack>') { return res.sendStatus(400) }

  if(req.body.user_name == '<the-slack-user-who-is-allowed-to-send-a-message>') {
    let parsed = req.body.text.split(' ');
    let id = parsed.splice(0, 1);

    global.io.to(id).emit('msg', {
      from: '<whoever-you-want-it-to-be-from>',
      text: parsed.join(' ')
    });
  }

  res.sendStatus(200);
});
```

You may notice we are parsing for an `id`, that's because in the current implementation we need to prefix 
every message with the user's socket id. Which is provided in all their messages via an attachment.

**Stay tuned for an example of client-side usage**

[![npm version](https://badge.fury.io/js/landingbot.svg)](https://badge.fury.io/js/landingbot)
[![Dependency Status](https://www.versioneye.com/user/projects/5880d92f452b830032bb7011/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/5880d92f452b830032bb7011)
[![Code Climate](https://codeclimate.com/github/camwhite/landingbot/badges/gpa.svg)](https://codeclimate.com/github/camwhite/landingbot)

# Installation

`npm i landingbot -S`

# Usage

Landingbot can be used with no additional options, like below.

```
const Landingbot = require('landingbot');
let landingbot = new Landingbot();
```

Or with an options object like this

```
const Landingbot = require('landingbot');
let landingbot = new Landingbot({
  name: 'Cambot',
  page: 'Cam\'s site',
  owner: 'Cam'
});
```

Additionally a `slack_hook` can be specified in the options, to allow for realtime correspondece via Slack. You must create an [incoming webhook](https://slack.com/services/new/incoming-webhook) with Slack.

*Note: This is only step one of two to enable back and forth communication from Slack to landingbot and vice versa*

### Want to use Custom Expressions?

Well you can do that too! The second arguement of the constructor accepts an array of objects. You can do that like this...

```
const Landingbot = require('landingbot');
const customExpressions = [
  {
    regex: /Is\ this\ some\ question/ig,
    question: 'Is this some question?',
    response: 'Landingbot's reply to the question'
  }
];
let landingbot = new Landingbot({
  name: 'Cambot',
  page: 'Cam\'s site',
  owner: 'Cam'
}, customExpressions);
```

# Examples

Using landingbot on the server-side with socket.io and incorporating Slack. 
This example assumes your client is listening for a `msg` event as well as emitting 
one for every new message.

> Have a look at [this](https://github.com/camwhite/landingbot/blob/master/examples/sockets.js) for what it may look like.

Remember how I mentioned there were two steps to enable back and forth comms within Slack? 
Well in this configuration the next step is as follows.. 
First create an [outgoing webhook](https://slack.com/services/new/outgoing-webhook) with Slack. 
Then you need your server to handle a post to whatever hook url you specified, maybe something like this...

> Take a look [here](https://github.com/camwhite/landingbot/blob/master/examples/app.js) for a simple example.

You may notice we are parsing for an `id`, that's because in the current implementation we need to prefix 
every message with the user's socket id. Which is provided in all their messages via an attachment.

**Stay tuned for an example of client-side usage example**

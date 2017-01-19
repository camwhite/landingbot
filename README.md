# Installion

`npm i landingbot -S`

# Requirements

- node >= v6

*If used on the server-side a signalling channel is necessary, such as [socket.io](https://socket.io)*

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

**Stay tuned detailed examples forthcoming...**

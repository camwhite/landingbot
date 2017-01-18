'use strict';

const Slack = require('node-slack');

class Bot {

  constructor(opts, expressions) {
    let defaultOpts = {
      name: 'landingbot',
      page: 'my site',
      owner: 'the owner'
    };
    this.opts = opts || defaultOpts;

    let defaultExpressions = [
      {
        regex: /Who\ are\ you/ig,
        question: 'Who are you?',
        response: `I\'m ${this.opts.name} brought to you by [Cam White](https://camwhite.site).`
      },
      {
        regex: /What\ do\ you\ do/ig,
        question: 'What do you do?',
        response: `I help drive engagement with visitors!`
      }
    ];

    if(expressions) {
      this.expressions = [...defaultExpressions, ...expressions];
    }
    else {
      this.expressions = defaultExpressions;
    }

    if(this.opts.slack_hook) {
      this.slack = new Slack(this.opts.slack_hook);
      this.expressions.push({
        regex: /How\ can\ I\ contact/ig,
        question: `How can I contact ${this.opts.owner}?`,
        response: `You can use the ping command by typing \`ping\` to notify ${this.opts.owner}.`
      });
    }

    this.messages = [];
  }

  greetUser() {
    return {
      from: this.opts.name,
      text: `Hi and welcome to ${this.opts.page}. Could I ask your name to address you more personally?`
    };
  }

  respondToUser(message, id) {
    this.message = message;
    this.socketId = id;

    this.messages.push(message);
    let response = this._generateResponse();

    return { from: this.opts.name, text: response };
  }

  sendToSlack(message) {
    this.slack.send({
      text: message,
      username: this.currentUser,
      attachments: [{ fallback: this.socketId, title: 'ID', text: this.socketId }],
      icon_emoji: ':taco:'
    });
  }

  _generateResponse() {
    if(this.messages.length <= 1) {
      this.currentUser = this.message;
      return `Thanks ${this.currentUser} I really appreciate you stoppping by!
              Presently I can understand the following questions..
              ${this.expressions.map(exp => exp.question)}`.replace(/\,/g, ' ');
    }
    else if(this.slack && /ping/ig.test(this.message)) {
      this.hasPinged = true;
      this.sendToSlack(`I want to talk to ${this.opts.owner}`);

      return `I have pinged ${this.opts.owner}. Give them a minute or two to respond, 
              you will see that reply right here! From this point on all further messages
              are directed to ${this.opts.owner}. Goodbye, ${this.opts.name} signing off.`;
    }

    let canPing = `Feel free to type \`ping\` to notify ${this.opts.owner}.`

    for(let exp of this.expressions) {
      if(exp.regex.test(this.message)) {
        return this.response = exp.response;
      }
      else {
        this.response = `Sorry ${this.currentUser} I couldn\'t understand that. ${this.slack ? canPing : ''}`;
      }
    }

    return this.response;
  }

}

module.exports = Bot;

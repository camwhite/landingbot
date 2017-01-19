'use strict';

module.exports = [
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

'use strict';

module.exports = (opts) => {
  return [
    {
      regex: /Who\ are\ you/ig,
      question: 'Who are you?',
      response: `I\'m ${opts.name} brought to you by [Cam White](https://camwhite.site).`
    },
    {
      regex: /What\ do\ you\ do/ig,
      question: 'What do you do?',
      response: `I help drive engagement with visitors!`
    }
  ];
}

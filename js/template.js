'use strict';

var Handlebars = require('hbsfy/runtime');

var thread = require('../templates/thread.handlebars');
var tweet = require('../templates/tweet.handlebars');
var compose = require('../templates/compose.handlebars');

module.exports = {
	tweet: tweet,
	compose: compose,
	thread: thread
};


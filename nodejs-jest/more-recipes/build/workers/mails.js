'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('dotenv').config();
var kue = require('kue');
var path = require('path');
var winston = require('winston');
var Email = require('email-templates');
var nodeMailer = require('nodemailer');

var config = require('./../config');
var redisConfig = require('./../config/redis');

var queueConfig = void 0;

if (process.env.NODE_ENV === 'production') {
  queueConfig = _extends({}, redisConfig.production);
} else {
  queueConfig = null;
}

var queue = kue.createQueue(queueConfig);
winston.info('The queue was created successfully. listening to jobs.');

var transporter = nodeMailer.createTransport({
  host: config.MAILER.HOST,
  port: config.MAILER.PORT,
  auth: {
    user: config.MAILER.USER, // generated ethereal user
    pass: config.MAILER.PASS // generated ethereal password
  }
});

var sendEmail = async function sendEmail(recipient, message, template) {
  if (!recipient) {
    return Promise.reject(new Error('No user provided'));
  }
  if (!message) {
    return Promise.reject(new Error('No message provided'));
  }

  var email = new Email({
    message: {
      from: '👻 Bahdcoder More-recipes',
      subject: '\uD83D\uDC7B ' + (message.subject || 'Bahdcoder More-recipes'),
      to: recipient.email
    },
    transport: transporter,
    send: true,
    preview: false,
    views: {
      root: path.resolve('server/emails')
    }
  });

  try {
    var results = await email.send({
      template: template.pug,
      locals: _extends({}, template.locals)
    });

    return Promise.resolve(results);
  } catch (error) {
    return Promise.reject(error);
  }
};

var sendBatchEmails = async function sendBatchEmails(_ref) {
  var users = _ref.users,
      template = _ref.template,
      message = _ref.message,
      recipe = _ref.recipe;

  users.forEach(async function (user) {
    var locals = { name: user.name, recipeTitle: recipe.title };
    try {
      await sendEmail(user, _extends({}, template, { locals: locals }), message);
    } catch (error) {
      winston.info('The email sending process to ' + user.name + ' was not successfull');
      winston.info(error);
    }
  });
};

queue.process('mails', async function (job, done) {
  try {
    var email = job.data;
    winston.info('The email to ' + email.recipient.email + ' is being processed ...');
    await sendEmail(email.recipient, email.message, email.template);
    winston.info('The email to ' + email.recipient.email + ' was successfull.');
    done();
  } catch (errors) {
    winston.info('The email sending was a failure.');
    winston.info(errors);
    done();
  }
});

queue.process('batchMails', async function (job, done) {
  try {
    winston.info('The batch emails are about to be sent out to all favoriters ...');
    await sendBatchEmails(job.data);
    winston.info('The batch email sending was successful.');
    done();
  } catch (errors) {
    winston.info('The email sending was a failure.');
    winston.info(errors);
    done();
  }
});
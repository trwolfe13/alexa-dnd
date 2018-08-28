'use strict';

const Alexa = require('ask-sdk-core');
const CancelAndStopIntent = require('./cancel-and-stop.intent');
const ErrorHandler = require('./error-handler');
const HelloWorldIntentHandler = require('./hello-world.intent');
const HelpIntentHandler = require('./help.intent');
const LaunchRequestHandler = require('./launch.request');
const SessionEndedRequestHandler = require('./session-ended.request');

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntent,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
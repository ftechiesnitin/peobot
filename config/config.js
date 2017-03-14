const builder = require('botbuilder');
// const dotenv = require('dotenv');

// Load environment variables from .env file
// dotenv.load();

const config = module.exports = {};

// App configuration
config.env = process.env.APP_ENV;
config.port = process.env.APP_PORT;
// Connection to Microsoft Bot Framework
config.botFramework = {
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
};
// API AI configs
config.apiAi = {
  clientToken: process.env.CLIENT_TOKEN
};

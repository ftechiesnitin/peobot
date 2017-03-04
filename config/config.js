const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.load();

const config = module.exports = {};

// App configuration
config.env = process.env.APP_ENV;
config.port = process.env.APP_PORT;

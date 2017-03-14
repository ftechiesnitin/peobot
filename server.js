const restify = require('restify');
const builder = require('botbuilder');
const apiAiRecognizer = require('api-ai-recognizer');
// Get configuration
const cfg = require('./config/config.js');
// Bot Configs
const connector = new builder.ChatConnector({
  appId: cfg.botFramework.appId,
  appPassword: cfg.botFramework.appPassword
});
const bot = new builder.UniversalBot(connector);
const recognizer = new apiAiRecognizer(cfg.apiAi.clientToken);
const intents = new builder.IntentDialog({
     recognizers: [recognizer]
});
// add intents to bot
bot.dialog('/', intents);

// Event when Message received
intents.matches('greeting', function (session) {
    return session.send("Hey there, I am Pune Eat outs, I am food lover. Want to know more about Pune Eat Out. Ask me.");
});

intents.matches('whatIsPeo', function (session) {
    return session.send("PEO is PUNE EAT OUTS. A Food lover group for pune people. We find good places to eat and share it with people.");
});

intents.matches('whoStarted', function (session) {
    return session.send("PEO was started by Avengers.");
});

// Server Init
const server = restify.createServer();
server.use(restify.queryParser());
const port = (process.env.PORT || 8000);
server.listen(port, function() {
    console.log('Listening on ' + port);
});
server.post('/api/message', connector.listen());

/* For Facebook Validation */
server.get('/webhook', function(req, res) {
  if (req.query.hub.mode && req.query.hub.verify_token === cfg.botFramework.appId) {
    res.send(200, parseInt(req.query.hub.challenge));
  } else {
    res.status(403).end();
  }
});

server.get('/test', function (req, res) {
  res.send({'message': 'test api.'});
});

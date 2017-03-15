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

intents.matches('whoStartedPeo', function (session) {
    return session.send("PEO was started by Avengers.");
});

intents.matches('peoCardInfo', function (session) {
    return session.send("More about PEO card http://puneeatouts.in/privilege-card/. One card for one person :).");
});
// time to get the peo card
intents.matches('moreAboutPeoCard', function (session) {
    return session.send("The PEO cards for year 2017 will be announced on 1st April 2017. You can know the process then.");
});

intents.matches('peoCardOffers', function (session) {
    return session.send("For current PEO (Privilege) CARD offers, you can visit http://puneeatouts.in/peo-privilege/. These offers will change for 2017-18.");
});

intents.matches('paymentOfPeoCard', function (session) {
    return session.send("Good things take time :). Let's wait till 1st April and its not a April fool..");
});

intents.matches('friendsOfPeo', function (session) {
    return session.send("Friends of PEO.");
});

intents.matches('whatIsPeoMeet', function (session) {
    return session.send("PEO meet is a specially curated and organized gathering of PEO members. Only 3-5 meets happen in an year and its a fun of its kind to attend these. So far in last 12 years we have done 35 meets.");
});

intents.matches('aniRelation', function (session) {
    return session.send("About Aniruddha patil.");
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

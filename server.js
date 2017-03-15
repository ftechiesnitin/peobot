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
    return session.send("Started on 21st Sept 2015. PEO is in its 12th year.");
});

intents.matches('whoStartedPeo', function (session) {
    return session.send("An engineer, then a MBA then a business consultant but a food lover before everything, founder of PEO and perhaps among the finest food people you have seen.");
});

intents.matches('peoCardInfo', function (session) {
    var data = "It's a signature offering of PEO for its FriendsofPEO Program. " +
             "Since 2005, we are indeed proud to have played our bit in shaping and influencing the food scene in Pune. " +
             "We have been a part of an engagement, friendship and sharing called PEO. " +
             "Friends Of PEO Program is targeted at increasing our footprint further and position ourselves strategically where we get more value every time when we eat out. " +
             "The idea is to connect the restaurants directly with their customers. " +
             "We want the patrons to feel at home and connected to the place so that they can not only appreciate " +
             "the great food but also provide valuable inputs to the food place owners. " +
             "For PEO card holders, this is an opportunity to get more value in our food outings. " +
             "That's not all; we also get to know more about the food, the place and the owners. Get your PEO card, Get recognized! " +
             "For Restaurants, a very genuine medium to reach and know their customers personally and better!";
    return session.send( data + " More about PEO card http://puneeatouts.in/privilege-card/.");
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
    return session.send("An engineer , then a MBA then a business consultant but a food lover before everything , founder of PEO and perhaps among the finest food people you have seen.");
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

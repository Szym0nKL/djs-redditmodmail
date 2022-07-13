const { Client, Intents } = require('discord.js');
const Snoowrap = require('snoowrap');
const { discordToken, discordFeedChannel, redditClientId, redditClientSecret, redditRefreshToken, redditUserAgentDescription, watchedSubreddit } = require('./config.json');
// ALL of the above values have to be REPLACED in the config.json file.
// redditUserAgentDescription is OPTIONAL
// watchedSubreddit needs to be entered WITHOUT r/

const MailFeed = require('./modmail/feed');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

client.on('ready', () =>{
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

if (redditClientId && redditClientSecret && redditRefreshToken) {
    const r = new Snoowrap({
        userAgent: redditUserAgentDescription || 'Automatic modmail fetch bot',
        clientId: redditClientId,
        clientSecret: redditClientSecret,
        refreshToken: redditRefreshToken,
    });
    const mailFeed = new MailFeed(client, r, watchedSubreddit, discordFeedChannel);
    mailFeed.mainLoop();
} else {
    console.error('Reddit access not configured. Please enter the client ID, client secret, and refresh token in the config.json file.');
}

client.login(discordToken);
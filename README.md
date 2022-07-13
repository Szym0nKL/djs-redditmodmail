# Discord.js Reddit ModMail
Discord.js bot sending Reddit ModMail to Discord

## Setup

1. Open `config.json` file
2. Replace all of the placeholder values (i.e. `DISCORD_BOT_TOKEN`, `SUBREDDIT_NAME`, etc.) with the ones you want to use.
3. Run the bot using **Node.js**

## Additional notes

`discordFeedChannel` should be the ID of the channel which you want the messages to be sent to.

`watchedSubreddit` requires the name of the subreddit **without the r/**

Additionally, the [reddit-oauth-helper](https://github.com/not-an-aardvark/reddit-oauth-helper) tool might help with filling out Reddit bot's values.

If you have troubles setting up the bot, [discordjs.guide](https://discordjs.guide) website has the process described in a beginner-friendly manner.

The code is partially from the [MTM8/discord-reddit-modmail](https://github.com/MTM8/discord-reddit-modmail) repository, that version however doesn't work with the newest Discord.js version. This repository contains a reworked version created for Discord.js v13.8.1, made to be more user-friendly.

## 

* [Node.js](https://nodejs.org/en/)

* [Discord.js](https://discord.js.org/#/)

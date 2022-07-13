const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = function (client, r, subreddit, channelId) {
    const me = this;
    let lastMailTime = 0;

    this.processMessages = (messages) => {
        messages.reverse().forEach((mail) => {
            if(mail.messages[0].date > lastMailTime){
                let mailMessage = mail.messages[0].bodyMarkdown;
                if (mailMessage.length > 2048) {
                    mailMessage = `${mailMessage.substring(0, 2045)}...`;
                }

                // Username formatting

                const username = mail.messages[0].author.name.name;
                let sender = `[u/${username}](https://www.reddit.com/user/${username})`;
                if (mail.messages[0].author.name.isHidden) {
                    sender += ' (hidden)';
                }

                // Discord embed message

                let embed = new Discord.MessageEmbed()
                    .setTitle('Modmail received!')
                    .setDescription(`**${mail.subject}**\n${mailMessage}`)
                    .setFields(
                        { name: `Sent by`, value: `${sender}`, inline: true }
                    )
                    .setFooter({ text: `r/${mail.owner.displayName}` })
                    .setColor('01ff67')
                    .setTimestamp(mail.messages[0].date);
                
                // Adding link button

                const channel = client.channels.cache.get(channelId);
                const row = new MessageActionRow()
                .addComponents(
                    new MessageButton() 
                        .setURL(`https://mod.reddit.com/mail/perma/${mail.id}`)
                        .setLabel('View Message')
                        .setStyle('LINK'),
                );

                channel.send({ embeds: [embed], components: [row] });
                lastMailTime = mail.messages[0].date;
            }
        });
    }

    this.mainLoop = () => {
        if(lastMailTime == 0){
            r.getSubreddit(subreddit).getNewModmailConversations({ limit: 1 })
            .then((modlog) => {
                try {
                    lastMailTime = modlog[0].messages[0].date;
                } catch(error) {
                    console.error('Error while getting first subreddit modmail.', error);
                }
            })
            .catch((error) => {
                console.error('Error while initializing subreddit modmail loop.', error);
            })
            .finally(() => {
                setTimeout(me.mainLoop, 10000);
            });
        } else {
            r.getSubreddit(subreddit).getNewModmailConversations({ limit: 3 })
            .then(me.processMessages)
            .catch((error) => {
                console.error('Error getting new subreddit modmail.', error);
            })
            .finally(() => {
                setTimeout(me.mainLoop, 10000);
            });
        }
    }
}